import { useMemo } from "react";
import { GetFeedDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@apollo/client/react";
import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";

function FeedPage() {
  useDocumentTitle("Feed");

  const { data, loading } = useQuery(GetFeedDocument, {
    fetchPolicy: "network-only",
  });

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
          [...Array(3)].map((_, index) => <PostCardSkeleton key={`post-skeleton${index}`}/>)
        ) : (
          posts?.map((post) => post && <PostCard key={`post-${post.id}`} post={post} />)
        )}
      </div>
    </div>
  );
}

export default FeedPage;
