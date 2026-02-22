import { useNavigate, useOutletContext } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useCallback, useState } from "react";
import { ContextProfileFragment, LoginDocument } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { useMutation } from "@apollo/client/react";
import { FaGoogle } from "react-icons/fa";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

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
        variables: { user, password },
      })
        .then((response) => {
          setProfile(response.data?.login?.myProfile as ContextProfileFragment);
          navigate("/home");
        })
        .catch((_) => {});
    },
    [user, password, setProfile, navigate, login],
  );

  const handleGoogleLogin = () => {};

  return (
    <form onSubmit={handleLogin}>
      <TextInput
        label="Email or Username"
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

      <p className="text-sm text-error mt-2">{apiError?.message}</p>

      {/* Remember me & Forgot password */}
      <div className="flex mt-6 items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-sm text-base-content/70">Remember me</span>
        </label>
        <a
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </a>
      </div>

      {/* Login button */}
      <Button
        loading={loading}
        type="submit"
        className="mt-4 btn btn-primary w-full"
      >
        Sign In
      </Button>

      {/* Divider */}
      <div className="divider text-xs text-base-content/40">OR</div>

      {/* Google login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn w-full gap-2"
      >
        <FaGoogle size={18} />
        Continue with Google
      </button>

      {/* Sign up link */}
      <p className="text-center text-sm text-base-content/60 mt-6">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          Create one
        </a>
      </p>
    </form>
  );
}

export default LoginPage;
