import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useState } from "react";
import {
  ContextProfileFragment,
  SignUpDocument,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { setStoredProfile } from "@/utils/auth";
import { usernameValidator } from "@/utils/validators/username-validator";
import { emailValidator } from "@/utils/validators/email-validator";
import { passwordValidator } from "@/utils/validators/password-validator";
import { useMutation } from "@apollo/client/react";
import { HiArrowRight } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { formatError } from "@/utils/format-error";
import strings from "@/translations/strings";

function RegisterPage() {
  useDocumentTitle(strings.auth.registerTitle);

  const { setProfile } = useProfile();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validating, setValidating] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [signup, { loading, error: apiError }] = useMutation(SignUpDocument);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    setValidating(true);

    const newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    const emailValidationError = emailValidator(email);
    if (emailValidationError) {
      newErrors.email = emailValidationError;
    }

    const usernameValidationError = usernameValidator(username);
    if (usernameValidationError) {
      newErrors.username = usernameValidationError;
    }

    const passwordValidationError = passwordValidator(password);
    if (passwordValidationError) {
      newErrors.password = passwordValidationError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = strings.auth.pleaseConfirmPassword;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = strings.auth.passwordsDoNotMatch;
    }

    setErrors(newErrors);
    setValidating(false);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    try {
      const response = await signup({
        variables: { username, email, password, rememberMe },
      });

      const profile = response.data?.signUp
        ?.myProfile as ContextProfileFragment;
      setStoredProfile(profile);
      setProfile(profile);
      navigate("/welcome");
    } catch {
      // Errors surface inline via the apiError display below the form.
    }
  };

  const isLoading = loading || validating;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-3xl font-black tracking-tight leading-[1.05] mb-1">
          {strings.auth.joinTheSquad}{" "}
          <span className="text-primary">{strings.auth.joinTheSquadHighlight}</span>.
        </h1>
        <p className="text-sm text-base-content/60">
          {strings.auth.registerSubtitle}
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-2">
        <TextInput
          label={strings.auth.email}
          type="email"
          placeholder={strings.auth.emailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
          required
        />

        <TextInput
          label={strings.auth.username}
          type="text"
          placeholder={strings.auth.usernamePlaceholder}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase());
            if (errors.username) setErrors({ ...errors, username: "" });
          }}
          error={errors.username}
          required
        />

        <TextInput
          label={strings.auth.password}
          type="password"
          placeholder={strings.auth.passwordCreatePlaceholder}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          error={errors.password}
          required
        />

        <TextInput
          label={strings.auth.confirmPassword}
          type="password"
          placeholder={strings.auth.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword)
              setErrors({ ...errors, confirmPassword: "" });
          }}
          error={errors.confirmPassword}
          required
        />

        {apiError && (
          <p className="text-sm text-error mt-2">{formatError(apiError)}</p>
        )}

        <div className="pt-2 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm text-base-content/70">{strings.auth.rememberMe}</span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary mt-0.5"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <span className="text-sm text-base-content/70 leading-snug">
              {strings.auth.agreeToTermsPrefix}{" "}
              <Link to="/terms" className="text-primary hover:underline">
                {strings.auth.termsOfService}
              </Link>{" "}
              {strings.common.and}{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                {strings.auth.privacyPolicy}
              </Link>
              .
            </span>
          </label>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={!agreeToTerms}
          className="btn-primary btn-lg w-full gap-2 btn-arrow !mt-5"
        >
          {strings.auth.createAccountAction}
          <HiArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-center text-sm text-base-content/60 !mt-5">
          {strings.auth.alreadyHaveAccount}{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            {strings.auth.signIn}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
