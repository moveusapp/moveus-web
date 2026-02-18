import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useCallback, useState } from "react";
import {
  ContextProfileFragment,
  LoginDocument,
} from "@/graphql/graphql-types";
import TextInput from "@/components/input/TextInput";
import { HashLoader } from "react-spinners";
import { LOADER_COLOR } from "@/constants";
import { useProfile } from "@/context/profile-context";
import { useMutation } from "@apollo/client/react";

export function LoginPage() {
  useDocumentTitle("Login");

  const { setProfile } = useProfile();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LoginDocument);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!user || !password) return;
      login({
        variables: { user, password },
      })
        .then((response) => {
          setProfile(response.data?.login?.myProfile as ContextProfileFragment);
          navigate("/");
        })
        .catch((error) => {});
    },
    [user, password, setProfile, navigate, login],
  );

  return (
    <div className="container-center">
      <h2 className="text-3xl font-medium mb-4">So nice to have you back!</h2>
      <form className="block w-full" onSubmit={handleSubmit}>
        <TextInput
          name="user"
          placeholder="username/email"
          setValue={setUser}
          value={user}
          label="Username or email"
        />
        <TextInput
          name="password"
          setValue={setPassword}
          value={password}
          label="Password"
          type="password"
        />
        <Link to="/forgot" className="text-right underline my-2 block">
          Forgot password?
        </Link>
        <p className="text-error">{error?.message}</p>
        {loading ? (
          <HashLoader className="mx-auto mt-8" color={LOADER_COLOR} />
        ) : (
          <button type="submit" className="mt-6">
            Log in
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
