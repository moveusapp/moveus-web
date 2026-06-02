import { Question, QuestionKind } from "@/surveys/types";
import FullNameQuestion from "./survey-questions/FullNameQuestion";
import TextQuestion from "./survey-questions/TextQuestion";
import TextAreaQuestion from "./survey-questions/TextAreaQuestion";
import SingleChoiceQuestion from "./survey-questions/SingleChoiceQuestion";
import MultiChoiceQuestion from "./survey-questions/MultiChoiceQuestion";
import DateOfBirthQuestion from "./survey-questions/DateOfBirthQuestion";
import SliderQuestion from "./survey-questions/SliderQuestion";
import ProfilePictureQuestion from "./survey-questions/ProfilePictureQuestion";
import ActivityRatingQuestion from "./survey-questions/ActivityRatingQuestion";
import AvailabilityQuestion from "./survey-questions/AvailabilityQuestion";

interface Props {
  question: Question<any>;
  value: any;
  onChange: (value: any) => void;
}

function QuestionRenderer({ question, value, onChange }: Props) {
  switch (question.kind) {
    case QuestionKind.FullName:
      return (
        <FullNameQuestion
          value={value ?? { firstName: "", lastName: "" }}
          onChange={onChange}
        />
      );
    case QuestionKind.Text:
      return (
        <TextQuestion
          value={value ?? ""}
          onChange={onChange}
          placeholder={question.placeholder}
        />
      );
    case QuestionKind.TextArea:
      return (
        <TextAreaQuestion
          value={value ?? ""}
          onChange={onChange}
          placeholder={question.placeholder}
        />
      );
    case QuestionKind.SingleChoice:
      return (
        <SingleChoiceQuestion
          enumObj={question.enum}
          enumNamespace={question.enumNamespace}
          value={value}
          onChange={onChange}
        />
      );
    case QuestionKind.MultiChoice:
      return (
        <MultiChoiceQuestion
          enumObj={question.enum}
          enumNamespace={question.enumNamespace}
          value={value ?? []}
          onChange={onChange}
        />
      );
    case QuestionKind.DateOfBirth:
      return <DateOfBirthQuestion value={value ?? null} onChange={onChange} />;
    case QuestionKind.Slider:
      return (
        <SliderQuestion
          value={value}
          onChange={onChange}
          min={question.min}
          max={question.max}
          step={question.step}
          labelsNamespace={question.labelsNamespace}
          unit={question.unit}
        />
      );
    case QuestionKind.ProfilePicture:
      return (
        <ProfilePictureQuestion value={value ?? null} onChange={onChange} />
      );
    case QuestionKind.ActivityRating:
      return (
        <ActivityRatingQuestion
          activityEnum={question.activityEnum}
          activityNamespace={question.activityNamespace}
          skillEnum={question.skillEnum}
          skillNamespace={question.skillNamespace}
          value={value ?? []}
          onChange={onChange}
        />
      );
    case QuestionKind.Availability:
      return (
        <AvailabilityQuestion
          dayEnum={question.dayEnum}
          dayNamespace={question.dayNamespace}
          timeEnum={question.timeEnum}
          timeNamespace={question.timeNamespace}
          value={value ?? []}
          onChange={onChange}
        />
      );
  }
}

export default QuestionRenderer;

export function isAnswered(question: Question<any>, value: any): boolean {
  if (value == null) return false;
  switch (question.kind) {
    case QuestionKind.FullName:
      return !!value.firstName?.trim() && !!value.lastName?.trim();
    case QuestionKind.Text:
    case QuestionKind.TextArea:
    case QuestionKind.SingleChoice:
      return typeof value === "string" && value.trim() !== "";
    case QuestionKind.MultiChoice:
      return Array.isArray(value) && value.length > 0;
    case QuestionKind.DateOfBirth:
      return value instanceof Date;
    case QuestionKind.Slider:
      return typeof value === "number" && Number.isFinite(value);
    case QuestionKind.ProfilePicture:
      return value instanceof File;
    case QuestionKind.ActivityRating:
      return (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v.activity && v.skillLevel)
      );
    case QuestionKind.Availability:
      return Array.isArray(value) && value.length > 0;
  }
}

export function isValid(question: Question<any>, value: any): boolean {
  const answered = isAnswered(question, value);
  if (question.required && !answered) return false;
  if (!answered) return true;
  if (question.validate && !(question.validate as (v: any) => boolean)(value)) {
    return false;
  }
  return true;
}
