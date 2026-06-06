import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import {
  ConfirmEmailDocument,
  ContextProfileFragment,
  ResendVerificationCodeDocument,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { useToast } from "@/context/toast-context";
import {
  clearPendingVerificationEmail,
  getPendingVerificationEmail,
  setStoredProfile,
} from "@/utils/auth";
import { useMutation } from "@apollo/client/react";
import { HiArrowRight, HiOutlineEnvelope } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import CodeInput from "@/components/ui/CodeInput";
import { formatError } from "@/utils/format-error";
import useDocumentTitle from "../hooks/use-document-title";
import strings from "@/translations/strings";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

function VerifyEmailPage() {
  useDocumentTitle(strings.auth.verifyTitle);

  const { profile, setProfile } = useProfile();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    (location.state as { email?: string } | null)?.email ??
    getPendingVerificationEmail() ??
    "";

  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const [confirmEmail, { loading: confirming, error: apiError }] =
    useMutation(ConfirmEmailDocument);
  const [resendCode, { loading: resending }] = useMutation(
    ResendVerificationCodeDocument,
  );

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleConfirm = async (value: string) => {
    if (value.length < CODE_LENGTH || confirming) return;
    try {
      const response = await confirmEmail({ variables: { code: value } });
      const myProfile = response.data?.confirmEmail
        ?.myProfile as ContextProfileFragment;
      if (!myProfile) return;
      setStoredProfile(myProfile);
      setProfile(myProfile);
      clearPendingVerificationEmail();
      toast.success(strings.toast.emailVerified);
      navigate("/survey/basic-info");
    } catch {
      // Errors surface inline via the apiError display below the form.
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleConfirm(code);
  };

  const handleResend = async () => {
    if (!email || cooldown > 0 || resending) return;
    try {
      await resendCode({ variables: { email } });
      toast.success(strings.toast.codeSent);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  // A verified user has no business here; nothing to verify without an email.
  if (profile?.emailVerified) return <Navigate to="/home" replace />;
  if (!email) return <Navigate to="/register" replace />;

  return (
    <div>
      <div className="mb-8">
        <HiOutlineEnvelope
          className="w-8 h-8 text-primary mb-4"
          aria-hidden="true"
        />
        <h1 className="text-3xl font-black tracking-tight leading-[1.05]">
          {strings.auth.verifyHeading}{" "}
          <span className="text-primary">
            {strings.auth.verifyHeadingHighlight}
          </span>
          .
        </h1>
        <p className="mt-2 text-sm text-base-content/60">
          {strings.formatString(strings.auth.verifySubtitle, { email })}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <CodeInput
          value={code}
          onChange={setCode}
          onComplete={handleConfirm}
          length={CODE_LENGTH}
          disabled={confirming}
          hasError={!!apiError}
          autoFocus
          ariaLabel={strings.auth.codeLabel}
        />

        {apiError && (
          <p className="mt-3 text-sm text-error">{formatError(apiError)}</p>
        )}

        <Button
          type="submit"
          loading={confirming}
          disabled={code.length < CODE_LENGTH}
          className="btn-primary btn-lg w-full gap-2 btn-arrow mt-6"
        >
          {strings.auth.verifyAction}
          <HiArrowRight className="w-5 h-5" />
        </Button>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-base-content/60">
          <div className="flex items-center gap-1.5">
            <span>{strings.auth.didntGetCode}</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="font-semibold text-primary hover:underline disabled:text-base-content/40 disabled:no-underline disabled:cursor-not-allowed"
            >
              {cooldown > 0
                ? (strings.formatString(strings.auth.resendCooldown, {
                    seconds: cooldown,
                  }) as string)
                : strings.auth.resend}
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{strings.auth.wrongEmail}</span>
            <Link
              to="/register"
              onClick={() => clearPendingVerificationEmail()}
              className="font-semibold text-primary hover:underline"
            >
              {strings.auth.backToSignUp}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyEmailPage;
