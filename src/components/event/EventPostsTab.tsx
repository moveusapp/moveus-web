import { EventOrganizerFragment, PostFragment } from "@/graphql/graphql-types";
import UserAvatar from "../images/UserAvatar";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventPostsTab({ posts, organizer }: EventPostsTabProps) {
  return (
    <div className="flex flex-col overflow-auto grow gap-4">
      {posts === undefined ? (
        <Skeleton count={4} height={100}/>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="rounded-[15px] box-border p-6 bg-block relative"
          >
            <p className="text-sm absolute top-6 right-6">
              {timeAgo(post.timePosted)}
            </p>
            <div className="usertab mt-auto mb-8">
              <UserAvatar
                canChange={false}
                userId={organizer?.user.id!}
                className="inline-block"
              />
              <div className="inner">
                <div className="tags">
                  <p>Organizer</p>
                </div>
                <h4>
                  {displayName(
                    organizer!.user.username,
                    organizer!.user.firstName,
                    organizer!.user.lastName,
                  )}
                </h4>
                <p className="username">@{organizer!.user.username}</p>
              </div>
            </div>
            <h2 className="main-text">{post.title}</h2>
            <img
              src={`${import.meta.env.VITE_BUCKET_URL}post-pictures/${post.id}`}
              alt="Post"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="my-4"
            />
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EventPostsTab;

interface EventPostsTabProps {
  posts?: PostFragment[];
  organizer?: EventOrganizerFragment;
}
