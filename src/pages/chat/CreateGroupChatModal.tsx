import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { RiCheckLine } from "react-icons/ri";
import {
  CreateGroupChatDocument,
  GetMyFollowingDocument,
  UserBadge as UserBadgeType,
} from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useToast } from "@/context/toast-context";
import { formatError } from "@/utils/format-error";
import strings from "@/translations/strings";

const MAX_NAME = 60;
const MIN_MEMBERS = 2;

interface FollowingUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  badge?: UserBadgeType | null;
}

interface CreateGroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (chatId: number) => void;
}

function CreateGroupChatModal({ isOpen, onClose, onCreated }: CreateGroupChatModalProps) {
  const toast = useToast();
  const { dialogRef } = useHtmlDialog(isOpen);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [groupName, setGroupName] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, loading: loadingFollowing } = useQuery(GetMyFollowingDocument, {
    skip: !isOpen,
  });

  const [createGroupChat, { loading: creating }] = useMutation(CreateGroupChatDocument);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(new Set());
      setGroupName("");
      setSearchText("");
      // Autofocus the search on open so keyboard users can start typing.
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const following = useMemo<FollowingUser[]>(() => {
    const rows = data?.following ?? [];
    return rows
      .map((row) => row?.user)
      .filter((u): u is NonNullable<typeof u> => !!u && u.id != null)
      .map((u) => ({
        id: u.id!,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        avatarUrl: u.avatarUrl,
        badge: u.badge,
      }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return following;
    return following.filter((u) => {
      const full = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        full.includes(q) ||
        u.username.toLowerCase().includes(q)
      );
    });
  }, [following, searchText]);

  const selectedUsers = useMemo(
    () => following.filter((u) => selectedIds.has(u.id)),
    [following, selectedIds],
  );

  const toggleUser = (userId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const canSubmit = selectedIds.size >= MIN_MEMBERS && !creating;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      const result = await createGroupChat({
        variables: {
          name: groupName.trim() || null,
          userIds: [...selectedIds],
        },
      });
      const chatId = result.data?.createGroupChat?.chat?.id;
      if (chatId != null) {
        toast.success(strings.toast.groupChatCreated);
        onCreated(chatId);
        onClose();
      }
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  const hasFollowing = following.length > 0;
  const hasMatches = filtered.length > 0;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.chat.newGroupTitle}
    >
      <div className="modal-box max-w-lg p-0 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <h3 className="text-xl font-bold leading-tight flex-1 min-w-0">
            {strings.chat.newGroupTitle}
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
          {/* Sticky chips + search */}
          <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-sm border-b border-base-content/8 px-5 pb-3">
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pb-3">
                {selectedUsers.map((u) => {
                  const name = u.firstName || u.username;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => toggleUser(u.id)}
                      className="group inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/15 text-primary text-sm transition-colors"
                      aria-label={
                        strings.formatString(strings.chat.removeMemberAria, {
                          name,
                        }) as string
                      }
                    >
                      <UserAvatar imageUrl={u.avatarUrl} className="w-6 h-6" />
                      <span className="font-medium max-w-[10rem] truncate">
                        {name}
                      </span>
                      <HiXMark className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            )}

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

          {/* List */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-2">
            {loadingFollowing ? (
              <div className="flex flex-col gap-1 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <div className="skeleton w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="skeleton h-3 w-1/3 rounded" />
                      <div className="skeleton h-2.5 w-1/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !hasFollowing ? (
              <div className="py-4">
                <EmptyState
                  title={strings.chat.noFollowingTitle}
                  description={strings.chat.noFollowingBody}
                >
                  <Link
                    to="/search"
                    onClick={onClose}
                    className="btn btn-sm btn-primary rounded-2xl"
                  >
                    {strings.chat.noFollowingCta}
                  </Link>
                </EmptyState>
              </div>
            ) : !hasMatches ? (
              <p className="py-10 text-center text-sm text-base-content/50">
                {strings.chat.noSearchMatches}
              </p>
            ) : (
              <ul className="flex flex-col gap-0.5 py-2">
                {filtered.map((u) => {
                  const selected = selectedIds.has(u.id);
                  const displayName =
                    `${u.firstName} ${u.lastName}`.trim() || u.username;
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
                          <UserAvatar imageUrl={u.avatarUrl} className="w-10 h-10" />
                          {selected && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-sm ring-2 ring-base-100">
                              <RiCheckLine className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {displayName}
                            </p>
                            <UserBadge badge={u.badge} />
                          </div>
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

          {/* Footer */}
          <div className="border-t border-base-content/8 px-5 py-4 flex flex-col gap-3 bg-base-100">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              maxLength={MAX_NAME}
              placeholder={strings.chat.groupNamePlaceholder}
              aria-label={strings.chat.groupNameLabel}
              className="input rounded-2xl w-full"
              disabled={creating}
            />
            <div className="flex items-center gap-3">
              <p
                className={`text-xs flex-1 min-w-0 ${
                  selectedIds.size >= MIN_MEMBERS
                    ? "text-primary font-medium"
                    : "text-base-content/55"
                }`}
              >
                {selectedIds.size >= MIN_MEMBERS
                  ? (strings.formatString(strings.chat.selectedCount, {
                      count: selectedIds.size,
                    }) as string)
                  : strings.chat.selectAtLeastTwo}
              </p>
              <Button
                type="submit"
                loading={creating}
                disabled={!canSubmit}
                className="btn-primary"
              >
                {strings.chat.createGroup}
              </Button>
            </div>
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

export default CreateGroupChatModal;
