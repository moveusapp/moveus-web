import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useState } from "react";
import {
  ContextProfileFragment,
  SignUpDocument,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { setStoredProfile } from "@/utils/auth-storage";
import {
  usernameValidator,
  usernameTaken,
} from "@/utils/validators/username-validator";
import { emailTaken, emailValidator } from "@/utils/validators/email-validator";
import { passwordValidator } from "@/utils/validators/password-validator";
import { useMutation } from "@apollo/client/react";
import { HiArrowRight } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

function RegisterPage() {
  useDocumentTitle("Register");

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
    } else {
      const isEmailTaken = await emailTaken(email);
      if (isEmailTaken) {
        newErrors.email = "This email is already registered";
      }
    }

    const usernameValidationError = usernameValidator(username);
    if (usernameValidationError) {
      newErrors.username = usernameValidationError;
    } else {
      const isUsernameTaken = await usernameTaken(username);
      if (isUsernameTaken) {
        newErrors.username = "This username is already taken";
      }
    }

    const passwordValidationError = passwordValidator(password);
    if (passwordValidationError) {
      newErrors.password = passwordValidationError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
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
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const isLoading = loading || validating;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-3xl font-black tracking-tight leading-[1.05] mb-1">
          Join the{" "}
          <span className="relative inline-block">
            <span className="text-primary">squad</span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 200 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 Q 50 2, 100 5 T 198 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-accent"
                fill="none"
              />
            </svg>
          </span>
          .
        </h1>
        <p className="text-sm text-base-content/70">
          Set up your account and start moving with people nearby.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-1">
        <TextInput
          label="Email"
          type="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
          required
        />

        <TextInput
          label="Username"
          type="text"
          placeholder="Pick a username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase());
            if (errors.username) setErrors({ ...errors, username: "" });
          }}
          error={errors.username}
          required
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          error={errors.password}
          required
        />

        <TextInput
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
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
          <p className="text-sm text-error mt-2">{apiError.message}</p>
        )}

        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm text-base-content/70">Remember me</span>
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
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={!agreeToTerms}
          className="mt-5 btn btn-primary btn-lg w-full gap-2 shadow-lg shadow-primary/30 hover:scale-[1.01] transition-transform"
        >
          Create account
          <HiArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-center text-sm text-base-content/60 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
