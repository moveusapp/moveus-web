import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useCallback, useState } from "react";
import { ContextProfileFragment, LoginDocument } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { setStoredProfile } from "@/utils/auth";
import { useMutation } from "@apollo/client/react";
import { HiArrowRight } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { formatError } from "@/utils/format-error";

function LoginPage() {
  useDocumentTitle("Login");

  const { setProfile } = useProfile();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { loading, error: apiError }] = useMutation(LoginDocument);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!user || !password) return;
      login({
        variables: { user, password, rememberMe },
      })
        .then((response) => {
          const profile = response.data?.login
            ?.myProfile as ContextProfileFragment;
          setStoredProfile(profile);
          setProfile(profile);
          navigate("/home");
        })
        .catch((_) => {});
    },
    [user, password, rememberMe, setProfile, navigate, login],
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight leading-[1.05] mb-2">
          Welcome <span className="text-primary">back</span>.
        </h1>
        <p className="text-sm text-base-content/60">
          Sign in and pick up where you left off.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-3">
        <TextInput
          label="Email or username"
          type="text"
          placeholder="example@domain.com"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {apiError && (
          <p className="text-sm text-error mt-2">{formatError(apiError)}</p>
        )}

        <div className="flex pt-2 items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm text-base-content/70">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          loading={loading}
          type="submit"
          className="btn-primary btn-lg w-full gap-2 btn-arrow !mt-7"
        >
          Sign in
          <HiArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-center text-sm text-base-content/60 !mt-8">
          New to MoveUs?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
