import type { ApolloClient } from "@apollo/client";
import {
  GetAvatarUploadDocument,
  GetEventImageUploadDocument,
  type UploadTicketFragment,
} from "@/graphql/graphql-types";

const UPLOAD_TIMEOUT_MS = 60_000;
const UPLOAD_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 600;
const READ_ATTEMPTS = 3;
const READ_RETRY_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isNotReadable(err: unknown): boolean {
  return err instanceof DOMException && err.name === "NotReadableError";
}

/**
 * Read the file's bytes, retrying the transient `NotReadableError` that mobile
 * throws when the picked reference has gone stale between selection and upload
 * (iCloud-offloaded photos, a backgrounded picker). Other read errors fail every
 * time, so we don't waste attempts on them.
 */
async function readFileBytes(file: File): Promise<ArrayBuffer> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < READ_ATTEMPTS; attempt++) {
    try {
      return await file.arrayBuffer();
    } catch (err) {
      lastErr = err;
      if (!isNotReadable(err)) break;
      await delay(READ_RETRY_DELAY_MS);
    }
  }
  throw lastErr;
}

export async function uploadWithTicket(
  ticket: UploadTicketFragment,
  file: File,
): Promise<void> {
  const buffer = await readFileBytes(file);
  const blob = new Blob([buffer], { type: file.type });
  const headers = new Headers();
  for (const header of ticket.headers) {
    if (header) headers.set(header.name, header.value);
  }

  let lastErr: unknown;
  for (let attempt = 0; attempt < UPLOAD_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
    try {
      const res = await fetch(ticket.url, {
        method: ticket.method,
        body: blob,
        headers,
        signal: controller.signal,
      });
      if (res.ok) return;
      lastErr = new Error(`Upload failed with status ${res.status}`);
      // A 4xx means the signed ticket is bad/expired or the request was denied;
      // retrying the same ticket won't help, so surface it immediately.
      if (res.status >= 400 && res.status < 500) break;
    } catch (err) {
      // fetch only rejects for network errors or the timeout abort, both of
      // which are transient and worth another attempt.
      lastErr = err;
    } finally {
      clearTimeout(timeout);
    }
    if (attempt < UPLOAD_ATTEMPTS - 1) {
      await delay(RETRY_BASE_DELAY_MS * 2 ** attempt);
    }
  }
  throw lastErr;
}

export async function uploadProfilePicture(
  apollo: ApolloClient,
  file: File,
): Promise<void> {
  const { data } = await apollo.query({
    query: GetAvatarUploadDocument,
    variables: { contentType: file.type },
    fetchPolicy: "network-only",
  });
  const ticket = data?.avatarUpload;
  if (!ticket) {
    throw new Error("Could not get upload ticket for profile picture.");
  }
  await uploadWithTicket(ticket, file);
}

export async function uploadEventThumbnail(
  apollo: ApolloClient,
  eventId: number,
  file: File,
): Promise<void> {
  const { data } = await apollo.query({
    query: GetEventImageUploadDocument,
    variables: { eventId, contentType: file.type },
    fetchPolicy: "network-only",
  });
  const ticket = data?.eventImageUpload;
  if (!ticket) {
    throw new Error("Could not get upload ticket for event thumbnail.");
  }
  await uploadWithTicket(ticket, file);
}

export async function fileToBase64(file: File): Promise<string> {
  try {
    const reader = new FileReader();

    return await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(""); // resolve with undefined on error
      reader.readAsDataURL(file);
    });
  } catch {
    return "";
  }
}
