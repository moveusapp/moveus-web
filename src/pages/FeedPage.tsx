import { useMemo } from "react";
import UserAvatar from "@/components/images/UserAvatar";
import { GetFeedDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@apollo/client/react";

function FeedPage() {
  useDocumentTitle("Feed");

  const { data, loading } = useQuery(GetFeedDocument, { fetchPolicy: "network-only" });

  const posts = useMemo(
    () =>
      data?.joinedEvents
        ?.map((e) =>
          e?.posts.map((p) => {
            return {
              ...p,
              organizer: e.organizer,
            };
          }),
        )
        .flat()
        .sort((a, b) => b!.timePosted!.getTime() - a!.timePosted!.getTime()),
    [data],
  );

  return (
    <div className="vertical">
      <div className="grow overflow-y-auto gap-4 flex flex-col pb-8">
        {loading ? (
          <Skeleton count={3} height={170} borderRadius={10}/>
        ) : (
          posts?.map(
            (post) =>
              post && (
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
                      userId={post.organizer!.user.id!}
                      className="inline-block"
                    />
                    <div className="inner">
                      <div className="tags">
                        <p>organizer</p>
                      </div>
                      <h4>
                        {displayName(
                          post.organizer!.user.username,
                          post.organizer!.user.firstName,
                          post.organizer!.user.lastName,
                        )}
                      </h4>
                      <p className="username">@{post.organizer!.user.username}</p>
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
              ),
          )
        )}
      </div>
    </div>
  );
}

export default FeedPage;
