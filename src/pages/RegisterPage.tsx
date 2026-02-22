import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";
import { FormEvent, useState } from "react";
import {
  ContextProfileFragment,
  SignUpDocument,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import {
  usernameValidator,
  usernameTaken,
} from "@/utils/validators/username-validator";
import { emailTaken, emailValidator } from "@/utils/validators/email-validator";
import { passwordValidator } from "@/utils/validators/password-validator";
import { useMutation } from "@apollo/client/react";
import { FaGoogle } from "react-icons/fa";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

function RegisterPage() {
  useDocumentTitle("Register");

  const { setProfile } = useProfile();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validating, setValidating] = useState(false);

  // Error state
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
    
    // Reset errors
    const newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    
    // Validate email
    const emailValidationError = emailValidator(email);
    if (emailValidationError) {
      newErrors.email = emailValidationError;
    } else {
      // Check if email is taken
      const isEmailTaken = await emailTaken(email);
      if (isEmailTaken) {
        newErrors.email = "This email is already registered";
      }
    }
    
    // Validate username
    const usernameValidationError = usernameValidator(username);
    if (usernameValidationError) {
      newErrors.username = usernameValidationError;
    } else {
      // Check if username is taken
      const isUsernameTaken = await usernameTaken(username);
      if (isUsernameTaken) {
        newErrors.username = "This username is already taken";
      }
    }
    
    // Validate password
    const passwordValidationError = passwordValidator(password);
    if (passwordValidationError) {
      newErrors.password = passwordValidationError;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Set all errors
    setErrors(newErrors);
    setValidating(false);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    
    if (hasErrors) {
      return;
    }
    
    // All validations passed, submit form
    try {
      const response = await signup({
        variables: { username, email, password },
      });

      setProfile(
        response.data?.signup?.myProfile as ContextProfileFragment
      );
      navigate("/profile-setup");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleGoogleSignup = () => {};

  const isLoading = () => loading || validating;

  return (
    <form onSubmit={handleRegister}>
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
        placeholder="Create a username"
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
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
        }}
        error={errors.confirmPassword}
        required
      />

      {apiError && (
        <p className="text-sm text-error mt -2">{apiError?.message}</p>
      )}

      {/* Terms and conditions */}
      <label className="flex mt-6 items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-primary mt-0.5"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          required
        />
        <span className="text-sm text-base-content/70">
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Register button */}
      <Button
        type="submit"
        loading={isLoading()}
        className={`mt-4 btn btn-primary w-full ${!agreeToTerms ? "btn-disabled" : ""}`}
      >
        Create Account
      </Button>

      {/* Divider */}
      <div className="divider text-xs text-base-content/40">OR</div>

      {/* Google signup */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="btn w-full gap-2"
      >
        <FaGoogle size={20} />
        Sign up with Google
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-base-content/60 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

export default RegisterPage;