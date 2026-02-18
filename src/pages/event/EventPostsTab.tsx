import { PostCardFragment } from "@/graphql/graphql-types";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";

function EventPostsTab({ posts }: EventPostsTabProps) {
  return (
    <div className="flex flex-col overflow-auto grow gap-4">
      {posts === undefined
        ? [...Array(4)].map((_, index) => (
            <PostCardSkeleton key={`post-skeleton-${index}`} />
          ))
        : posts.map((post) => <PostCard key={`post-${post.id}`} post={post} />)}
    </div>
  );
}

export default EventPostsTab;

interface EventPostsTabProps {
  posts?: PostCardFragment[];
}
