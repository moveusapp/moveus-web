import { Link } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { EventMemberFragment } from "@/graphql/generated";
import UserAvatar from "../images/UserAvatar";
import { displayName } from "@/utils/display-name";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventParticipantsTab({ members }: EventParticipantsProps) {
  const { profile } = useProfile();

  return (
    <div className="grow flex flex-col overflow-hidden max-h-full">
      {members.map((member, index) => (
        <Link
          key={index}
          className="usertab mb-3"
          to={
            !member
              ? ""
              : member!.user.id === profile?.id
                ? "/profile"
                : `/user/${member!.user.id}`
          }
        >
          <UserAvatar
            canChange={false}
            userId={!member ? -1 : member!.user.id!}
            className="inline-block"
          />
          <div className="inner">
            {!member ? (
              <Skeleton width={Math.floor(Math.random() * (300 - 170 + 1)) + 170} />
            ) : (
              <>
                <div className="tags">
                  {["ORGANIZER", "MODERATOR"].includes(member.role!) && (
                    <p>{member.role?.toLocaleLowerCase()}</p>
                  )}
                </div>
                <h4>
                  {displayName(
                    member!.user.username,
                    member!.user.firstName,
                    member!.user.lastName,
                    profile?.username,
                  )}
                </h4>
              </>
            )}
            {!member ? (
              <Skeleton width={70} />
            ) : (
              <p className="username">@{member!.user.username}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventParticipantsTab;

interface EventParticipantsProps {
  members: EventMemberFragment[];
}
