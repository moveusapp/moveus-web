import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { RiCheckLine } from "react-icons/ri";
import {
  AddChatMemberDocument,
  GetMyFollowingDocument,
} from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import UserAvatar from "@/components/user/UserAvatar";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useToast } from "@/context/toast-context";
import { formatError } from "@/utils/format-error";
import { displayName } from "@/utils/display-name";
import strings from "@/translations/strings";

interface AddChatMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: number;
  existingMemberIds: Set<number>;
}

interface FollowingUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
}

function AddChatMembersModal({
  isOpen,
  onClose,
  chatId,
  existingMemberIds,
}: AddChatMembersModalProps) {
  const toast = useToast();
  const { dialogRef } = useHtmlDialog(isOpen);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchText, setSearchText] = useState("");

  const { data, loading: loadingFollowing } = useQuery(GetMyFollowingDocument, {
    skip: !isOpen,
  });
  const [addMember, { loading: adding }] = useMutation(AddChatMemberDocument);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(new Set());
      setSearchText("");
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const candidates = useMemo<FollowingUser[]>(() => {
    const rows = data?.following ?? [];
    return rows
      .map((row) => row?.user)
      .filter((u): u is NonNullable<typeof u> => !!u && u.id != null)
      .filter((u) => !existingMemberIds.has(u.id!))
      .map((u) => ({
        id: u.id!,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        profileImageUrl: u.profileImageUrl,
      }));
  }, [data, existingMemberIds]);

  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter((u) => {
      const full = `${u.firstName} ${u.lastName}`.toLowerCase();
      return full.includes(q) || u.username.toLowerCase().includes(q);
    });
  }, [candidates, searchText]);

  const toggleUser = (userId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const canSubmit = selectedIds.size > 0 && !adding;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await Promise.all(
        [...selectedIds].map((userId) =>
          addMember({ variables: { chatId, userId } }),
        ),
      );
      toast.success(strings.toast.membersAdded);
      onClose();
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  const hasCandidates = candidates.length > 0;
  const hasMatches = filtered.length > 0;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.chat.addMembersTitle}
    >
      <div className="modal-box max-w-lg p-0 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <h3 className="text-xl font-bold leading-tight flex-1 min-w-0">
            {strings.chat.addMembersTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label={strings.common.close}
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-sm border-b border-base-content/8 px-5 pb-3">
            <label className="input rounded-2xl flex items-center gap-2 w-full">
              <HiOutlineMagnifyingGlass className="w-4 h-4 text-base-content/50" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={strings.chat.searchFollowingPlaceholder}
                className="grow"
              />
            </label>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-2">
            {loadingFollowing ? (
              <div className="flex flex-col gap-1 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-2 py-2.5">
                    <div className="skeleton w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="skeleton h-3 w-1/3 rounded" />
                      <div className="skeleton h-2.5 w-1/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !hasCandidates ? (
              <div className="py-4">
                <EmptyState title={strings.chat.addMembersEmpty} />
              </div>
            ) : !hasMatches ? (
              <p className="py-10 text-center text-sm text-base-content/50">
                {strings.chat.noSearchMatches}
              </p>
            ) : (
              <ul className="flex flex-col gap-0.5 py-2">
                {filtered.map((u) => {
                  const selected = selectedIds.has(u.id);
                  const name = displayName(u.username, u.firstName, u.lastName);
                  return (
                    <li key={u.id}>
                      <button
                        type="button"
                        onClick={() => toggleUser(u.id)}
                        aria-pressed={selected}
                        className={`w-full text-left flex items-center gap-3 px-2 py-2 rounded-2xl transition-colors ${
                          selected
                            ? "bg-primary/10 hover:bg-primary/15"
                            : "hover:bg-base-200"
                        }`}
                      >
                        <div className="relative shrink-0">
                          <UserAvatar imageUrl={u.profileImageUrl} className="w-10 h-10" />
                          {selected && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-sm ring-2 ring-base-100">
                              <RiCheckLine className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">
                            {name}
                          </p>
                          <p className="text-xs text-base-content/55 truncate">
                            @{u.username}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-base-content/8 px-5 py-4 flex justify-end">
            <Button
              type="submit"
              loading={adding}
              disabled={!canSubmit}
              className="btn-primary"
            >
              {adding
                ? strings.chat.addingMembers
                : selectedIds.size === 0
                  ? strings.common.add
                  : (strings.formatString(strings.chat.addSelected, {
                      count: selectedIds.size,
                    }) as string)}
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

export default AddChatMembersModal;
