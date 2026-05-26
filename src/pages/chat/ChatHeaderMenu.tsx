import { ReactNode } from "react";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlinePencilSquare,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiEllipsisVertical,
} from "react-icons/hi2";
import strings from "@/translations/strings";

type Action = {
  key: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
};

interface ChatHeaderMenuProps {
  isGroup: boolean;
  onSetNickname: () => void;
  onViewMembers: () => void;
  onAddMembers: () => void;
  onLeaveChat: () => void;
}

function ChatHeaderMenu({
  isGroup,
  onSetNickname,
  onViewMembers,
  onAddMembers,
  onLeaveChat,
}: ChatHeaderMenuProps) {
  const close = () => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) el.blur();
  };

  const run = (fn: () => void) => () => {
    close();
    fn();
  };

  const actions: Action[] = [
    {
      key: "nickname",
      icon: <HiOutlinePencilSquare className="w-5 h-5" />,
      label: strings.chat.actionSetNickname,
      onClick: run(onSetNickname),
    },
  ];

  if (isGroup) {
    actions.push(
      {
        key: "view",
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        label: strings.chat.actionViewMembers,
        onClick: run(onViewMembers),
      },
      {
        key: "add",
        icon: <HiOutlineUserPlus className="w-5 h-5" />,
        label: strings.chat.actionAddMembers,
        onClick: run(onAddMembers),
      },
      {
        key: "leave",
        icon: <HiOutlineArrowRightOnRectangle className="w-5 h-5" />,
        label: strings.chat.actionLeaveChat,
        onClick: run(onLeaveChat),
        destructive: true,
      },
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        aria-label={strings.chat.actionsAria}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <HiEllipsisVertical className="text-xl" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-2xl shadow-lg border border-base-content/8 z-30 w-56 p-1.5 mt-2"
      >
        {actions.map((a) => (
          <li key={a.key}>
            <button
              type="button"
              onClick={a.onClick}
              className={`flex items-center gap-3 rounded-xl ${
                a.destructive ? "text-error hover:bg-error/10" : ""
              }`}
            >
              {a.icon}
              <span className="text-sm font-medium">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHeaderMenu;
