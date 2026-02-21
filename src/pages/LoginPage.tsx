import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useCallback, useState } from "react";
import { ContextProfileFragment, LoginDocument } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { useMutation } from "@apollo/client/react";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import { FaGoogle } from "react-icons/fa";
import Button from "@/components/ui/Button";

function LoginPage() {
  useDocumentTitle("Login");

  const { setProfile } = useProfile();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { loading, error }] = useMutation(LoginDocument);
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
    <div className="flex h-screen bg-base-300">
      {/* Left side - Login form */}
      <div className="flex flex-col bg-base-100 w-full md:w-[50%] md:max-w-[500px]">
        {/* Logo */}
        <div className="p-8 flex-shrink-0">
          <img src={moveusLogo} alt="MoveUs" className="h-12" />
        </div>

        {/* Form container - centered vertically */}
        <div className="flex-1 flex items-center px-8 pb-8">
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-base-content/60 mb-8">
              Sign in to continue to MoveUs
            </p>

            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email or Username</legend>
                <input
                  type="text"
                  className="input validator w-full"
                  placeholder="example@mail.com"
                  value={user}
                  required
                  onChange={(e) => setUser(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  className="input validator w-full"
                  placeholder="Your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>

              <p className="text-sm text-error">
                {error?.message}
              </p>

              {/* Remember me & Forgot password */}
              <div className="flex mt-6 items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-base-content/70">
                    Remember me
                  </span>
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
          </div>
        </div>
      </div>

      {/* Right side - Hero image/content (hidden on mobile) */}
      <div className="hidden md:flex flex-1 bg-primary/20 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            Your Workout Wingman
          </h2>
          <p className="text-lg text-base-content/70">
            Connect with others and join exciting sports events in your area.
            From basketball to yoga, find your next adventure today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
