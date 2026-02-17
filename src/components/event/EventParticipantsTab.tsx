import { Link } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { EventMemberFragment } from "@/graphql/generated";
import UserImage from "../images/UserImage";
import { displayName } from "@/utils/display-name";

function EventParticipantsTab({ members }: EventParticipantsProps) {
  const { profile } = useProfile();

  return (
    <div className="grow flex flex-col overflow-hidden max-h-full">
      {members.map((member) => (
        <Link
          className="usertab mb-3"
          key={member.user.id}
          to={
            member.user.id === profile?.id
              ? "/profile"
              : `/user/${member.user.id}`
          }
        >
          <UserImage
            canChange={false}
            userId={member.user.id!}
            className="inline-block"
          />
          <div className="inner">
            <div className="tags">
              {["ORGANIZER", "MODERATOR"].includes(member.role!) && (
                <p>{member.role?.toLocaleLowerCase()}</p>
              )}
            </div>
            <h4>
              {displayName(
                member.user.username,
                member.user.firstName,
                member.user.lastName,
                profile?.username,
              )}
            </h4>
            <p className="username">@{member.user.username}</p>
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
