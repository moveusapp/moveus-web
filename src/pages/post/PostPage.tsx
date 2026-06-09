import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
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
import UserBadge from "@/components/user/UserBadge";
import CommentSection from "@/components/comment/CommentSection";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { useLikeToggle } from "@/hooks/use-like-toggle";
import strings from "@/translations/strings";

function PostPage() {
  useDocumentTitle(strings.post.documentTitle);

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
    <>
      {loading && !post && <PostPageSkeleton />}

      {notFound && (
        <div className="mx-auto w-full max-w-[600px] px-4 py-6">
          <EmptyState
            title={strings.post.notFound}
            description={strings.post.notFoundDesc}
          >
            <Link to="/home" className="btn btn-primary rounded-2xl">
              {strings.post.backHome}
            </Link>
          </EmptyState>
        </div>
      )}

      {post && <PostBody post={post} />}
    </>
  );
}

function PostBody({ post }: { post: PostCardFragment }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex min-w-0 grow flex-col">
        <article className="mx-auto w-full max-w-[600px] px-4 py-6">
          <PostMain post={post} />

          <div className="mt-8 border-t border-base-300 pt-6 lg:hidden">
            <PostComments post={post} />
          </div>
        </article>
      </div>

      <aside
        aria-label={strings.ui.comments}
        className="sticky top-0 hidden h-screen flex-shrink-0 overflow-y-auto border-l border-base-300 lg:block lg:w-[360px]"
      >
        <div className="p-4">
          <PostComments post={post} />
        </div>
      </aside>
    </div>
  );
}

function PostMain({ post }: { post: PostCardFragment }) {
  const { liked, likeCount, justLiked, toggle: handleLike } = useLikeToggle({
    variables: { postId: post.id! },
    initialLiked: post.isLiked ?? false,
    initialCount: post.likes ?? 0,
    likeDoc: LikePostDocument,
    unlikeDoc: UnlikePostDocument,
  });

  const [showImageModal, setShowImageModal] = useState(false);

  const authorName = displayName(
    post.author!.username,
    post.author!.firstName,
    post.author!.lastName,
  );

  const imageUrl = post.imageUrl ?? null;

  return (
    <>
      <header className="flex items-center gap-3">
        <Link to={`/user/${post.author?.username}`} className="shrink-0">
          <UserAvatar imageUrl={post.author?.avatarUrl} className="h-12 w-12" />
        </Link>
        <div className="flex min-w-0 flex-col">
          <Link
            to={`/user/${post.author?.username}`}
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <span className="truncate text-lg font-bold">{authorName}</span>
            <UserBadge badge={post.author?.badge} size={20} />
          </Link>
          <span className="truncate text-sm text-base-content/60">
            @{post.author?.username} · {timeAgo(post.timePosted)}
          </span>
        </div>
      </header>

      {post.event && (
        <Link
          to={`/event/${post.event.id}`}
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-base-200 px-3 py-1.5 text-xs font-medium text-base-content/70 transition-colors hover:text-primary"
        >
          <HiOutlineCalendarDays className="h-3.5 w-3.5" />
          {strings.formatString(strings.post.postedInBlock, { title: post.event.title ?? "" })}
        </Link>
      )}

      {post.content && (
        <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-base-content">
          {post.content}
        </p>
      )}

      {imageUrl && (
        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="mt-4 block w-full overflow-hidden rounded-2xl transition-opacity hover:opacity-95"
        >
          <img
            src={imageUrl}
            alt={strings.post.postAttachmentAlt}
            onError={(e) =>
              (e.currentTarget.parentElement!.style.display = "none")
            }
            className="max-h-[32rem] w-full object-cover"
          />
        </button>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleLike}
          aria-label={liked ? strings.post.unlike : strings.post.like}
          aria-pressed={liked}
          className="flex items-center gap-2 text-sm font-medium text-base-content/60 transition-colors hover:text-error"
        >
          {liked ? (
            <HiHeart className={`h-6 w-6 text-error ${justLiked ? "animate-like-pop" : ""}`} />
          ) : (
            <HiOutlineHeart className="h-6 w-6" />
          )}
          <span>
            {strings.formatString(
              likeCount === 1 ? strings.post.likeCount : strings.post.likeCountPlural,
              { count: likeCount },
            )}
          </span>
        </button>
      </div>

      <ImageLightbox
        open={showImageModal}
        src={imageUrl}
        alt={strings.post.postAttachmentAlt}
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
        {strings.ui.comments}
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
    <div className="flex flex-col lg:flex-row" aria-hidden="true">
      <div className="flex min-w-0 grow flex-col">
        <div className="mx-auto w-full max-w-[600px] px-4 py-6">
          <PostMainSkeleton />

          <div className="mt-8 border-t border-base-300 pt-6 lg:hidden">
            <CommentsSkeleton />
          </div>
        </div>
      </div>

      <aside className="sticky top-0 hidden h-screen flex-shrink-0 overflow-y-auto border-l border-base-300 lg:block lg:w-[360px]">
        <div className="p-4">
          <CommentsSkeleton />
        </div>
      </aside>
    </div>
  );
}

function PostMainSkeleton() {
  return (
    <>
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
      <div className="skeleton mt-4 h-72 w-full rounded-2xl" />
      <div className="skeleton mt-6 h-6 w-24 rounded-full" />
    </>
  );
}

function CommentsSkeleton() {
  return (
    <div>
      <div className="skeleton mb-4 h-5 w-24" />

      <div className="flex items-end gap-2.5">
        <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
        <div className="skeleton h-10 flex-1 rounded-2xl" />
        <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-3.5 w-32" />
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
