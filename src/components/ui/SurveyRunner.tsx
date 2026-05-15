import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiArrowLeft, HiArrowRight, HiCheck } from "react-icons/hi";
import { QuestionKind, Survey } from "@/surveys/types";
import QuestionRenderer, { isValid } from "./QuestionRenderer";

interface Props {
  survey: Survey<any>;
}

function buildVariables(survey: Survey<any>, answers: Record<string, any>) {
  const vars: Record<string, any> = {};
  for (const q of survey.questions) {
    if (q.kind === QuestionKind.FullName) {
      const v = answers[q.kind] ?? {};
      vars[q.field[0]] = v.firstName ?? null;
      vars[q.field[1]] = v.lastName ?? null;
    } else {
      let value = answers[q.field];
      if (value instanceof Date) {
        value = value.toISOString().slice(0, 10);
      }
      vars[q.field] = value ?? null;
    }
  }
  return vars;
}

function answerKey(q: { kind: QuestionKind; field: string | readonly string[] }) {
  return q.kind === QuestionKind.FullName
    ? QuestionKind.FullName
    : (q.field as string);
}

function SurveyRunner({ survey }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const [runMutation, { loading }] = useMutation(survey.mutation);

  const total = survey.questions.length;
  const question = survey.questions[index];
  const key = answerKey(question);
  const value = answers[key];
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const canAdvance = isValid(question, value) && !loading;

  const setValue = (v: any) => setAnswers((a) => ({ ...a, [key]: v }));

  const handleNext = async () => {
    if (!canAdvance) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    try {
      await runMutation({ variables: buildVariables(survey, answers) });
      navigate(survey.onFinishedRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => setIndex((i) => Math.max(0, i - 1));

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
        <h2 className="text-3xl font-semibold tracking-tight leading-snug mb-6">
          {question.title}
        </h2>
        <QuestionRenderer
          question={question}
          value={value}
          onChange={setValue}
        />
      </div>

      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="btn btn-ghost btn-circle disabled:opacity-0"
          aria-label="Previous question"
        >
          <HiArrowLeft className="text-2xl" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className="btn btn-primary btn-circle"
          aria-label={isLast ? "Finish survey" : "Next question"}
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
