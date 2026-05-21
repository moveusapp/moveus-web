import { useParams, Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  HiCheckBadge,
  HiHeart,
  HiOutlineHeart,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import {
  GetPostDocument,
  LikePostDocument,
  UnlikePostDocument,
  PostCardFragment,
  CommentFragment,
} from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import EmptyState from "@/components/ui/EmptyState";
import ImageLightbox from "@/components/ui/ImageLightbox";
import UserAvatar from "@/components/user/UserAvatar";
import CommentSection from "@/components/comment/CommentSection";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";

function PostPage() {
  useDocumentTitle("Post");

  const { postId } = useParams();
  const id = Number(postId);
  const validId = Number.isInteger(id);

  const { data, loading } = useQuery(GetPostDocument, {
    variables: { id },
    skip: !validId,
    fetchPolicy: "cache-and-network",
  });

  const post = data?.post;
  const notFound = validId ? !loading && !post : true;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 xl:max-w-5xl">
      {loading && !post && <PostPageSkeleton />}

      {notFound && (
        <EmptyState
          title="Post not found"
          description="It may have been removed, or the link isn't quite right."
        >
          <Link to="/home" className="btn btn-primary rounded-2xl">
            Back home
          </Link>
        </EmptyState>
      )}

      {post && <PostBody post={post} />}
    </div>
  );
}

/**
 * Single column on tablet and mobile (post, then comments below). On wide
 * desktop the comments move into a right-hand rail beside the post.
 */
function PostBody({ post }: { post: PostCardFragment }) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:gap-0">
      <article className="min-w-0 flex-1 xl:pr-8">
        <PostMain post={post} />
      </article>
      <aside
        aria-label="Comments"
        className="w-full border-t border-base-300 pt-6 xl:w-[360px] xl:shrink-0 xl:border-l xl:border-t-0 xl:pt-0 xl:pl-8"
      >
        <PostComments post={post} />
      </aside>
    </div>
  );
}

function PostMain({ post }: { post: PostCardFragment }) {
  const [liked, setLiked] = useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes ?? 0);
  const [showImageModal, setShowImageModal] = useState(false);

  const [likePost] = useMutation(LikePostDocument);
  const [unlikePost] = useMutation(UnlikePostDocument);

  const authorName = displayName(
    post.author!.username,
    post.author!.firstName,
    post.author!.lastName,
  );

  const imageUrl = post.id
    ? `${import.meta.env.VITE_BUCKET_URL}/post-pictures/${post.id}`
    : null;

  const handleLike = useCallback(() => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
      unlikePost({ variables: { postId: post.id! } }).catch(() => {
        setLiked(true);
        setLikeCount((c) => c + 1);
      });
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      likePost({ variables: { postId: post.id! } }).catch(() => {
        setLiked(false);
        setLikeCount((c) => c - 1);
      });
    }
  }, [liked, post.id, likePost, unlikePost]);

  return (
    <>
      {/* Author */}
      <header className="flex items-center gap-3">
        <Link to={`/user/${post.author?.username}`} className="shrink-0">
          <UserAvatar userId={post.author?.id!} className="h-12 w-12" />
        </Link>
        <div className="flex min-w-0 flex-col">
          <Link
            to={`/user/${post.author?.username}`}
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <span className="truncate text-lg font-bold">{authorName}</span>
            {post.author?.verified && (
              <HiCheckBadge className="h-5 w-5 shrink-0 text-primary" />
            )}
          </Link>
          <span className="truncate text-sm text-base-content/60">
            @{post.author?.username} · {timeAgo(post.timePosted)}
          </span>
        </div>
      </header>

      {/* Event link */}
      {post.event && (
        <Link
          to={`/event/${post.event.id}`}
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-base-200 px-3 py-1.5 text-xs font-medium text-base-content/70 transition-colors hover:text-primary"
        >
          <HiOutlineCalendarDays className="h-3.5 w-3.5" />
          Posted in {post.event.title}
        </Link>
      )}

      {/* Content */}
      {post.content && (
        <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-base-content">
          {post.content}
        </p>
      )}

      {/* Image */}
      {imageUrl && (
        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="mt-4 block w-full overflow-hidden rounded-2xl transition-opacity hover:opacity-95"
        >
          <img
            src={imageUrl}
            alt="Post attachment"
            onError={(e) =>
              (e.currentTarget.parentElement!.style.display = "none")
            }
            className="max-h-[32rem] w-full object-cover"
          />
        </button>
      )}

      {/* Like */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleLike}
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
          className="flex items-center gap-2 text-sm font-medium text-base-content/60 transition-colors hover:text-error"
        >
          {liked ? (
            <HiHeart className="h-6 w-6 text-error" />
          ) : (
            <HiOutlineHeart className="h-6 w-6" />
          )}
          <span>
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </span>
        </button>
      </div>

      <ImageLightbox
        open={showImageModal}
        src={imageUrl}
        alt="Post attachment"
        onClose={() => setShowImageModal(false)}
      />
    </>
  );
}

function PostComments({ post }: { post: PostCardFragment }) {
  const comments = (post.comments ?? []).filter(Boolean) as CommentFragment[];

  return (
    <section>
      <h2 className="mb-4 text-base font-bold">
        Comments
        {comments.length > 0 && (
          <span className="ml-1.5 font-medium text-base-content/50">
            {comments.length}
          </span>
        )}
      </h2>
      <CommentSection
        entityType="post"
        entityId={post.id!}
        comments={comments}
      />
    </section>
  );
}

function PostPageSkeleton() {
  return (
    <div className="flex max-w-2xl flex-col">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-3 w-28" />
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-2/3" />
      </div>
      <div className="skeleton mt-4 h-60 w-full rounded-2xl" />
    </div>
  );
}

export default PostPage;
