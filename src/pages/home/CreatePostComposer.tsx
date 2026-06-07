import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import CreatePostModal from "@/components/post/CreatePostModal";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import strings from "@/translations/strings";

function CreatePostComposer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { profile } = useProfile();

  const prompt = profile?.firstName
    ? (strings.formatString(strings.home.composerPrompt, { name: profile.firstName }) as string)
    : strings.home.composerPromptGeneric;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 py-3 text-left transition-colors hover:bg-base-300"
      >
        {profile?.id != null && (
          <UserAvatar imageUrl={profile.avatarUrl} className="h-10 w-10 shrink-0" />
        )}
        <span className="flex-1 truncate text-sm text-base-content/70 transition-colors group-hover:text-base-content">
          {prompt}
        </span>
        <HiOutlinePencilSquare className="h-5 w-5 shrink-0 text-base-content/40 transition-colors group-hover:text-primary" />
      </button>

      <CreatePostModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={(postId) => navigate(`/post/${postId}`)}
      />
    </>
  );
}

export default CreatePostComposer;
