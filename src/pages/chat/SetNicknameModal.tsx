import { FormEvent, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@apollo/client/react";
import {
  GetChatDocument,
  SetChatNicknameDocument,
} from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useToast } from "@/context/toast-context";
import { formatError } from "@/utils/format-error";
import strings from "@/translations/strings";

const MAX_NICKNAME = 30;

interface SetNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: number;
  currentNickname: string;
}

function SetNicknameModal({
  isOpen,
  onClose,
  chatId,
  currentNickname,
}: SetNicknameModalProps) {
  const toast = useToast();
  const { dialogRef } = useHtmlDialog(isOpen);
  const [value, setValue] = useState(currentNickname);
  const [setNickname, { loading }] = useMutation(SetChatNicknameDocument, {
    refetchQueries: [
      { query: GetChatDocument, variables: { chatId } },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (isOpen) setValue(currentNickname);
  }, [isOpen, currentNickname]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    try {
      await setNickname({
        variables: { chatId, nickname: value.trim() },
      });
      toast.success(strings.toast.nicknameSaved);
      onClose();
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.chat.setNicknameTitle}
    >
      <div className="modal-box max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label={strings.common.close}
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold leading-tight">
              {strings.chat.setNicknameTitle}
            </h3>
            <p className="text-sm text-base-content/60 mt-1.5">
              {strings.chat.setNicknameSubtitle}
            </p>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={MAX_NICKNAME}
            placeholder={strings.chat.nicknamePlaceholder}
            aria-label={strings.chat.nicknamePlaceholder}
            className="input rounded-2xl w-full"
            disabled={loading}
            autoFocus
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-ghost rounded-2xl"
            >
              {strings.common.cancel}
            </button>
            <Button type="submit" loading={loading} className="btn-primary">
              {strings.common.save}
            </Button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default SetNicknameModal;
