import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useCallback, useState } from "react";
import { ContextProfileFragment, LoginDocument } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { setStoredProfile, setPendingVerificationEmail } from "@/utils/auth";
import { useMutation } from "@apollo/client/react";
import { HiArrowRight } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import {
  formatError,
  isVerificationPendingError,
} from "@/utils/format-error";
import strings from "@/translations/strings";

function LoginPage() {
  useDocumentTitle(strings.auth.loginTitle);

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
          // Backend may return an unverified profile instead of erroring;
          // route to verification rather than logging the user in. Only an
          // explicit false counts; a missing flag shouldn't trap a real user.
          if (profile && profile.emailVerified === false) {
            setPendingVerificationEmail(profile.email);
            navigate("/verify-email", { state: { email: profile.email } });
            return;
          }
          setStoredProfile(profile);
          setProfile(profile);
          navigate("/home");
        })
        .catch((err) => {
          // Backend may instead reject an unverified login with code 103.
          if (isVerificationPendingError(err)) {
            setPendingVerificationEmail(user);
            navigate("/verify-email", { state: { email: user } });
          }
        });
    },
    [user, password, rememberMe, setProfile, navigate, login],
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight leading-[1.05] mb-2">
          {strings.auth.welcomeBack}{" "}
          <span className="text-primary">{strings.auth.welcomeBackHighlight}</span>.
        </h1>
        <p className="text-sm text-base-content/60">
          {strings.auth.signInSubtitle}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-3">
        <TextInput
          label={strings.auth.emailOrUsername}
          type="text"
          placeholder={strings.auth.emailOrUsernamePlaceholder}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <TextInput
          label={strings.auth.password}
          type="password"
          placeholder={strings.auth.passwordPlaceholder}
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
            <span className="text-sm text-base-content/70">{strings.auth.rememberMe}</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline font-medium"
          >
            {strings.auth.forgotPassword}
          </Link>
        </div>

        <Button
          loading={loading}
          type="submit"
          className="btn-primary btn-lg w-full gap-2 btn-arrow !mt-7"
        >
          {strings.auth.signIn}
          <HiArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-center text-sm text-base-content/60 !mt-8">
          {strings.auth.newToMoveUs}{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            {strings.auth.createAccount}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
