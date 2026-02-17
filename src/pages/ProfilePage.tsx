import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "../hooks/use-document-title";
import UserView from "@/components/views/UserView";

function ProfilePage() {
  useDocumentTitle("Your profile");

  const { profile } = useProfile();

  return <UserView user={profile! as any} isSelf={true} />;
}

export default ProfilePage;
