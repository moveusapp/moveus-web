import { useProfile } from "@/context/profile-context";
import { EventMemberFragment, MemberRole } from "@/graphql/graphql-types";
import UserCard from "@/components/user/UserCard";
import UserCardSkeleton from "@/components/user/UserCardSkeleton";

function EventParticipantsTab({ members }: EventParticipantsProps) {
  const { profile } = useProfile();

  return (
    <div className="grow flex flex-col overflow-hidden max-h-full">
      {!members ? (
        [...Array(5)].map((_, index) => <UserCardSkeleton key={`skeleton-${index}`} />)
      ) : (
        members.map((member) => (
          <UserCard
            key={`user-${member.user.id}`}
            user={member.user}
            tags={
              member.role !== MemberRole.Participant
                ? [{ text: member.role!.toLocaleLowerCase() }]
                : []
            }
            isSelf={member.user.id === profile?.id}
          />
        ))
      )}
    </div>
  );
}

export default EventParticipantsTab;

interface EventParticipantsProps {
  members?: EventMemberFragment[];
}
