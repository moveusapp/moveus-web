import { setDocumentTitle } from "../../hooks/use-document-title";
import { useParams } from "react-router-dom";
import BackButton from "@/components/routes/BackButton";
import { HashLoader } from "react-spinners";
import { LOADER_COLOR } from "@/constants";
import { useEffect } from "react";
import UserView from "@/components/user/UserView";
import { useLazyQuery } from "@apollo/client/react";
import { GetUserDocument } from "@/graphql/graphql-types";

function UserPage() {
  const { userId } = useParams();

  const [getUser, { loading, error, data }] = useLazyQuery(GetUserDocument);
  const user = data?.user;

  useEffect(() => {
    if (!userId) return;
    getUser({
      variables: { userId: parseInt(userId) },
    })
      .then((result) => {
        setDocumentTitle(result.data?.user?.username ?? "Uh Oh");
      })
      .catch((_) => {});
  }, [userId, getUser]);

  return (
    <div className="pt-8 h-full flex flex-col">
      <BackButton />
      {(() => {
        switch (true) {
          case !userId || loading:
            return (
              <div className="h-full flex justify-center items-center">
                <HashLoader color={LOADER_COLOR} />
              </div>
            );
          case !!error || user === null || user === undefined:
            return <p className="mt-8">{error?.message}</p>;
          default:
            return <UserView user={user!} isSelf={false} />;
        }
      })()}
    </div>
  );
}

export default UserPage;
