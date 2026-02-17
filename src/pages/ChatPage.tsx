import { useMemo, useState } from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/images/UserAvatar";
import { useMyChatsQuery, useMyFriendsQuery } from "@/graphql/generated";
import useDocumentTitle from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ChatPageTab = "chats" | "friends";

function ChatPage() {
  useDocumentTitle("Chats");

  const [tab, setTab] = useState<ChatPageTab>("chats");

  const { data: unfilteredChats, loading: chatsLoading } = useMyChatsQuery({
    fetchPolicy: "network-only",
  });
  const { data: friends, loading: friendsLoading } = useMyFriendsQuery({
    fetchPolicy: "network-only",
  });

  const chats = useMemo(() => {
    return unfilteredChats?.myChats
      ?.filter((c) => c?.lastMessage)
      .sort(
        (a, b) =>
          b!.lastMessage!.timeSent!.getTime() -
          a!.lastMessage!.timeSent!.getTime(),
      );
  }, [unfilteredChats]);

  return (
    <div className="vertical">
      <div className="flex border-b border-foreground border-solid text-center justify-between py-2 mb-8">
        <p
          onClick={() => setTab("chats")}
          className={
            (tab === "chats" ? "text-block-accent" : "") +
            " w-full cursor-pointer font-medium text-lg"
          }
        >
          chats
        </p>
        <p
          onClick={() => setTab("friends")}
          className={
            (tab === "friends" ? "text-block-accent" : "") +
            " w-full cursor-pointer font-medium text-lg"
          }
        >
          friends
        </p>
      </div>
      {tab === "chats" ? (
        <div className="overflow-auto pb-8 flex-1 flex flex-col gap-3">
          {chatsLoading ? (
            <Skeleton count={4} height={90}/>
          ) : (
            chats?.map((chat) => (
              <Link
                key={chat?.id}
                className="p-6 rounded-[15px] relative bg-block block w-full box-border"
                to={`/chat/${chat?.members[0]!.user.id}`}
              >
                <span className="absolute top-6 right-6 text-[10px] font-medium">
                  {timeAgo(chat?.lastMessage?.timeSent!)}
                </span>
                <div className="flex gap-4 font-medium relative items-center">
                  <UserAvatar
                    canChange={false}
                    userId={chat?.members[0]!.user.id!}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="max-w-[55%] overflow-hidden">
                    <h5>
                      {displayName(
                        chat?.members[0]!.user.username!,
                        chat?.members[0]!.user.firstName!,
                        chat?.members[0]!.user.lastName!,
                      )}
                    </h5>
                    <p className="text-xs">
                      {chat?.lastMessage?.user.id !==
                        chat?.members[0]!.user.id &&
                        (chat!.lastMessage!.timeSent.getTime() >
                        (
                          chat?.members[0]!.lastOpen ?? new Date("1971-01-01")
                        ).getTime() ? (
                          <RiCheckLine className={"text-lg inline mr-1"} />
                        ) : (
                          <RiCheckDoubleLine className="text-lg inline mr-1" />
                        ))}
                      {chat?.lastMessage?.textContent ? (
                        chat?.lastMessage?.textContent
                      ) : (
                        <i>'attachment'</i>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div className="overflow-auto pb-8 flex-1 flex flex-col gap-8">
          {friendsLoading ? (
            <Skeleton count={4} height={90}/>
          ) : (
            friends?.friends?.map((friend) => (
              <Link
                key={friend?.user?.id}
                className="flex gap-4 items-center w-full"
                to={`/user/${friend?.user?.id}`}
              >
                <UserAvatar
                  canChange={false}
                  userId={friend?.user?.id!}
                  className="w-10 rounded-full"
                />
                <div>
                  <h2 className="font-medium">
                    {displayName(
                      friend?.user?.username!,
                      friend?.user?.firstName!,
                      friend?.user?.lastName!,
                    )}
                  </h2>
                  <p className="text-sm mb-1">@{friend?.user?.username}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ChatPage;
