import { useCallback, useMemo, useReducer } from "react";
import { useMutation, useSubscription } from "@apollo/client/react";
import { apolloClient } from "@/appolo/client";
import {
  ChatMessagesDocument,
  GetAttachmentUploadUrlDocument,
  SendChatMessageDocument,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { useToast } from "@/context/toast-context";
import { fileToBase64, putFileToSignedUrl } from "@/utils/upload";
import { formatError } from "@/utils/format-error";
import { ensureDateObject } from "@/utils/time-utils";
import strings from "@/translations/strings";

export type SendStatus = "sending" | "sent";

export type LocalMessage = {
  clientKey: string;
  id: number | null;
  userId: number;
  textContent: string | null;
  attachmentUrl: string | null;
  timeSent: Date;
  status: SendStatus;
};

type State = {
  byKey: Map<string, LocalMessage>;
  serverIdToKey: Map<number, string>;
};

type Action =
  | {
      type: "SYNC";
      messages: ReadonlyArray<IncomingMessage>;
      currentUserId: number | null;
    }
  | { type: "ADD_OPTIMISTIC"; entry: LocalMessage }
  | {
      type: "CONFIRM";
      clientKey: string;
      id: number;
      timeSent: Date;
      attachmentUrl: string | null;
    }
  | { type: "DROP"; clientKey: string };

type IncomingMessage = {
  id?: number | null;
  userId?: number | null;
  textContent?: string | null;
  timeSent?: unknown;
  attachmentUrl?: string | null;
};

const initialState: State = {
  byKey: new Map(),
  serverIdToKey: new Map(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SYNC": {
      // The subscription emits the full history per event, and in practice
      // arrives before the mutation HTTP response for the same message. To
      // avoid a duplicate bubble in that race, when we see an unknown server
      // id for our own user we adopt a pending optimistic with matching
      // content instead of inserting a fresh `s-<id>` entry. The bubble's
      // clientKey stays the same; React reconciles in place.
      const byKey = new Map(state.byKey);
      const serverIdToKey = new Map(state.serverIdToKey);
      const adoptable: LocalMessage[] = [];
      for (const m of state.byKey.values()) {
        if (m.id === null && m.status === "sending") adoptable.push(m);
      }

      for (const msg of action.messages) {
        if (msg?.id == null) continue;
        const existingKey = serverIdToKey.get(msg.id);
        if (existingKey) {
          const prev = byKey.get(existingKey);
          if (prev) {
            byKey.set(existingKey, {
              ...prev,
              id: msg.id,
              userId: msg.userId ?? prev.userId,
              textContent: msg.textContent ?? null,
              attachmentUrl: msg.attachmentUrl ?? null,
              timeSent: ensureDateObject(msg.timeSent as Date | string),
              status: "sent",
            });
          }
          continue;
        }

        let adoptedKey: string | null = null;
        if (
          action.currentUserId != null &&
          msg.userId === action.currentUserId
        ) {
          const incomingText = msg.textContent || null;
          const idx = adoptable.findIndex(
            (o) =>
              (o.textContent || null) === incomingText &&
              Boolean(o.attachmentUrl) === Boolean(msg.attachmentUrl),
          );
          if (idx >= 0) {
            adoptedKey = adoptable[idx].clientKey;
            adoptable.splice(idx, 1);
          }
        }

        const clientKey = adoptedKey ?? `s-${msg.id}`;
        byKey.set(clientKey, {
          clientKey,
          id: msg.id,
          userId: msg.userId ?? 0,
          textContent: msg.textContent ?? null,
          attachmentUrl: msg.attachmentUrl ?? null,
          timeSent: ensureDateObject(msg.timeSent as Date | string),
          status: "sent",
        });
        serverIdToKey.set(msg.id, clientKey);
      }
      return { byKey, serverIdToKey };
    }

    case "ADD_OPTIMISTIC": {
      const byKey = new Map(state.byKey);
      byKey.set(action.entry.clientKey, action.entry);
      return { ...state, byKey };
    }

    case "CONFIRM": {
      // The mutation has returned a real server id for our optimistic entry.
      // Race: if the subscription delivered first, an `s-<id>` entry already
      // exists in serverIdToKey. In that case drop the optimistic; otherwise
      // upgrade it in place so the same React key carries the confirmed state.
      const serverIdToKey = new Map(state.serverIdToKey);
      const byKey = new Map(state.byKey);
      const alreadyKnown = serverIdToKey.get(action.id);
      if (alreadyKnown && alreadyKnown !== action.clientKey) {
        byKey.delete(action.clientKey);
        return { byKey, serverIdToKey };
      }
      const prev = byKey.get(action.clientKey);
      if (!prev) return state;
      byKey.set(action.clientKey, {
        ...prev,
        id: action.id,
        timeSent: action.timeSent,
        attachmentUrl: action.attachmentUrl ?? prev.attachmentUrl,
        status: "sent",
      });
      serverIdToKey.set(action.id, action.clientKey);
      return { byKey, serverIdToKey };
    }

    case "DROP": {
      if (!state.byKey.has(action.clientKey)) return state;
      const byKey = new Map(state.byKey);
      byKey.delete(action.clientKey);
      return { ...state, byKey };
    }
  }
}

export type SendInput = { text: string; image: File | null };

export type SendOutcome = "ok" | "image-upload-failed" | "send-failed";

export function useChatMessages(chatId: number | undefined) {
  const { profile } = useProfile();
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [sendChatMessage] = useMutation(SendChatMessageDocument);

  const { loading } = useSubscription(ChatMessagesDocument, {
    variables: { chatId: chatId ?? 0 },
    skip: !chatId,
    onData: ({ data: { data } }) => {
      if (!data?.chatMessages) return;
      dispatch({
        type: "SYNC",
        messages: data.chatMessages.filter(Boolean) as IncomingMessage[],
        currentUserId: profile?.id ?? null,
      });
    },
  });

  const messages = useMemo(() => {
    return [...state.byKey.values()].sort((a, b) => {
      const diff = a.timeSent.getTime() - b.timeSent.getTime();
      if (diff !== 0) return diff;
      return a.clientKey < b.clientKey ? -1 : 1;
    });
  }, [state.byKey]);

  const send = useCallback(
    async ({ text, image }: SendInput): Promise<SendOutcome> => {
      if (!chatId) return "send-failed";
      const trimmed = text.trim();
      if (!trimmed && !image) return "send-failed";

      const clientKey = `c-${crypto.randomUUID()}`;
      const previewUrl = image ? await fileToBase64(image) : null;

      dispatch({
        type: "ADD_OPTIMISTIC",
        entry: {
          clientKey,
          id: null,
          userId: profile?.id ?? 0,
          textContent: trimmed || null,
          attachmentUrl: previewUrl,
          timeSent: new Date(),
          status: "sending",
        },
      });

      let attachmentId: string | null = null;
      if (image) {
        try {
          const result = await apolloClient.query({
            query: GetAttachmentUploadUrlDocument,
            variables: { contentType: image.type },
          });
          const newAttachment = result.data?.newAttachment;
          if (!newAttachment?.id || !newAttachment?.url) {
            throw new Error("Missing attachment upload URL");
          }
          await putFileToSignedUrl(newAttachment.url, image);
          attachmentId = newAttachment.id;
        } catch (error) {
          console.error(error);
          toast.error(formatError(error), strings.toast.imageUploadFailed);
          dispatch({ type: "DROP", clientKey });
          return "image-upload-failed";
        }
      }

      try {
        const { data } = await sendChatMessage({
          variables: { chatId, message: trimmed, attachmentId },
        });
        const real = data?.sendChatMessage?.chatMessage;
        if (!real?.id) throw new Error("Server returned no message id");
        dispatch({
          type: "CONFIRM",
          clientKey,
          id: real.id,
          timeSent: ensureDateObject(real.timeSent as Date | string),
          attachmentUrl: real.attachmentUrl ?? null,
        });
        return "ok";
      } catch (error) {
        console.error(error);
        toast.error(formatError(error), strings.toast.messageNotSent);
        dispatch({ type: "DROP", clientKey });
        return "send-failed";
      }
    },
    [chatId, profile?.id, sendChatMessage, toast],
  );

  return { messages, send, loading };
}
