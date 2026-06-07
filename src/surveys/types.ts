import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export enum QuestionKind {
  FullName = "FullName",
  Text = "Text",
  TextArea = "TextArea",
  SingleChoice = "SingleChoice",
  MultiChoice = "MultiChoice",
  DateOfBirth = "DateOfBirth",
  Slider = "Slider",
  ProfilePicture = "ProfilePicture",
  ActivityRating = "ActivityRating",
  Availability = "Availability",
}

export type ActivityRatingValue = { activity: string; skillLevel: string };
export type AvailabilityValue = { dayOfWeek: string; timeOfDay: string };

// Seeds a slider's starting value so it never submits null. Snapped to the
// step so the seed lands on a valid notch.
export function sliderMidpoint(min: number, max: number, step = 1): number {
  const mid = min + (max - min) / 2;
  const snapped = min + Math.round((mid - min) / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

type Base = {
  title: string;
  subtitle?: string;
  required?: boolean;
};

export type Question<TVars> =
  | (Base & {
      kind: QuestionKind.FullName;
      field: readonly [keyof TVars & string, keyof TVars & string];
      validate?: (value: { firstName: string; lastName: string }) => boolean;
    })
  | (Base & {
      kind: QuestionKind.Text;
      field: keyof TVars & string;
      placeholder?: string;
      validate?: (value: string) => boolean;
    })
  | (Base & {
      kind: QuestionKind.TextArea;
      field: keyof TVars & string;
      placeholder?: string;
      validate?: (value: string) => boolean;
    })
  | (Base & {
      kind: QuestionKind.SingleChoice;
      field: keyof TVars & string;
      enum: Record<string, string>;
      enumNamespace: string;
      validate?: (value: string) => boolean;
    })
  | (Base & {
      kind: QuestionKind.MultiChoice;
      field: keyof TVars & string;
      enum: Record<string, string>;
      enumNamespace: string;
      validate?: (value: string[]) => boolean;
    })
  | (Base & {
      kind: QuestionKind.DateOfBirth;
      field: keyof TVars & string;
      validate?: (value: Date) => boolean;
    })
  | (Base & {
      kind: QuestionKind.Slider;
      field: keyof TVars & string;
      min: number;
      max: number;
      step?: number;
      labelsNamespace?: string;
      // For metric sliders that can't enumerate a label per value (e.g. "km").
      unit?: string;
      // Maps each slider notch to an ordered enum value, low → high. When set,
      // the runner submits enumValues[value - min] instead of the raw number,
      // letting an ordinal enum field render as a slider.
      enumValues?: readonly string[];
      validate?: (value: number) => boolean;
    })
  | (Base & {
      kind: QuestionKind.ProfilePicture;
      validate?: (value: File) => boolean;
    })
  | (Base & {
      kind: QuestionKind.ActivityRating;
      field: keyof TVars & string;
      activityEnum: Record<string, string>;
      activityNamespace: string;
      skillEnum: Record<string, string>;
      skillNamespace: string;
      validate?: (value: ActivityRatingValue[]) => boolean;
    })
  | (Base & {
      kind: QuestionKind.Availability;
      field: keyof TVars & string;
      dayEnum: Record<string, string>;
      dayNamespace: string;
      timeEnum: Record<string, string>;
      timeNamespace: string;
      validate?: (value: AvailabilityValue[]) => boolean;
    });

export type Survey<TVars = Record<string, unknown>> = {
  id: string;
  mutation: TypedDocumentNode<unknown, TVars>;
  questions: Question<TVars>[];
  onFinishedRoute: string;
  // When set, the runner shows a quiet "skip" link that navigates here without
  // submitting the mutation. Omit to make the survey mandatory.
  onSkippedRoute?: string;
  // Shown as a success toast once the survey is submitted. Omit for no toast.
  successToast?: string;
};
