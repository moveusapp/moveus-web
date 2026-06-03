import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { HiArrowLeft, HiArrowRight, HiCheck } from "react-icons/hi";
import { QuestionKind, Question, Survey, sliderMidpoint } from "@/surveys/types";
import { uploadProfilePicture } from "@/utils/upload";
import { formatError } from "@/utils/format-error";
import QuestionRenderer, { isValid } from "./QuestionRenderer";
import FormError from "./FormError";
import strings from "@/translations/strings";

type AnyVars = Record<string, unknown>;
type Answers = Record<string, unknown>;

interface Props<TVars extends AnyVars> {
  survey: Survey<TVars>;
}

function buildVariables<TVars extends AnyVars>(
  survey: Survey<TVars>,
  answers: Answers,
): AnyVars {
  const vars: AnyVars = {};
  for (const q of survey.questions) {
    if (q.kind === QuestionKind.FullName) {
      const v = (answers[q.kind] ?? {}) as { firstName?: string; lastName?: string };
      vars[q.field[0]] = v.firstName ?? null;
      vars[q.field[1]] = v.lastName ?? null;
    } else if (q.kind === QuestionKind.ProfilePicture) {
      continue;
    } else {
      let value = answers[q.field];
      if (value instanceof Date) {
        value = value.toISOString().slice(0, 10);
      } else if (
        q.kind === QuestionKind.Slider &&
        q.enumValues &&
        typeof value === "number"
      ) {
        value = q.enumValues[value - q.min] ?? null;
      }
      vars[q.field] = value ?? null;
    }
  }
  return vars;
}

function answerKey<TVars extends AnyVars>(q: Question<TVars>): string {
  if (q.kind === QuestionKind.FullName) return QuestionKind.FullName;
  if (q.kind === QuestionKind.ProfilePicture) return QuestionKind.ProfilePicture;
  return q.field as string;
}

// Seed sliders at their midpoint so the knob reflects a real value and the
// user can submit without touching every one.
function initialAnswers<TVars extends AnyVars>(survey: Survey<TVars>): Answers {
  const answers: Answers = {};
  for (const q of survey.questions) {
    if (q.kind === QuestionKind.Slider) {
      answers[q.field] = sliderMidpoint(q.min, q.max, q.step);
    }
  }
  return answers;
}

function SurveyRunner<TVars extends AnyVars>({ survey }: Props<TVars>) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => initialAnswers(survey));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const apollo = useApolloClient();
  const [runMutation, { loading: mutationLoading }] = useMutation(
    survey.mutation,
  );
  const loading = mutationLoading || uploading;
  const errorRef = useRef<HTMLDivElement | null>(null);

  const total = survey.questions.length;
  const question = survey.questions[index];
  const key = answerKey(question);
  const value = answers[key];
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const canAdvance = isValid(question, value) && !loading;

  const setValue = (v: unknown) => {
    setSubmitError(null);
    setAnswers((a) => ({ ...a, [key]: v }));
  };

  const handleNext = async () => {
    if (!canAdvance) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    setSubmitError(null);
    const picture = answers[QuestionKind.ProfilePicture] as File | undefined;
    if (picture instanceof File) {
      setUploading(true);
      try {
        await uploadProfilePicture(apollo, picture);
      } catch (err) {
        console.error(err);
        setSubmitError(strings.validation.profilePictureUploadFailed);
        return;
      } finally {
        setUploading(false);
      }
    }
    try {
      await runMutation({
        variables: buildVariables(survey, answers) as TVars,
      });
    } catch (err) {
      console.error(err);
      setSubmitError(formatError(err));
      return;
    }
    navigate(survey.onFinishedRoute);
  };

  const handleBack = () => {
    setSubmitError(null);
    setIndex((i) => Math.max(0, i - 1));
  };

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitError]);

  return (
    <div className="min-h-full flex flex-col py-8 px-5 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="grow h-2 bg-base-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <span
          className="text-sm font-medium text-base-content/60 tabular-nums shrink-0"
          aria-live="polite"
        >
          {index + 1} / {total}
        </span>
      </div>

      <div
        key={index}
        className="flex-1 flex flex-col justify-center animate-survey-question"
      >
        <h2 className="text-3xl font-semibold tracking-tight leading-snug">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-base text-base-content/60 mt-2">
            {question.subtitle}
          </p>
        )}
        <div className="mb-6" />
        <QuestionRenderer
          question={question}
          value={value}
          onChange={setValue}
        />
        {submitError && isLast && (
          <div className="mt-4">
            <FormError ref={errorRef} message={submitError} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="btn btn-ghost btn-circle disabled:opacity-0"
          aria-label={strings.survey.previousQuestion}
        >
          <HiArrowLeft className="text-2xl" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className="btn btn-primary btn-circle"
          aria-label={isLast ? strings.survey.finishSurvey : strings.survey.nextQuestion}
        >
          {loading ? (
            <span className="loading loading-dots loading-sm" />
          ) : isLast ? (
            <HiCheck className="text-2xl" />
          ) : (
            <HiArrowRight className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SurveyRunner;
