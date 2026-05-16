import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export enum QuestionKind {
  FullName = "FullName",
  Text = "Text",
  TextArea = "TextArea",
  SingleChoice = "SingleChoice",
  MultiChoice = "MultiChoice",
  DateOfBirth = "DateOfBirth",
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
      validate?: (value: string) => boolean;
    })
  | (Base & {
      kind: QuestionKind.MultiChoice;
      field: keyof TVars & string;
      enum: Record<string, string>;
      validate?: (value: string[]) => boolean;
    })
  | (Base & {
      kind: QuestionKind.DateOfBirth;
      field: keyof TVars & string;
      validate?: (value: Date) => boolean;
    });

export type Survey<TVars = Record<string, unknown>> = {
  id: string;
  mutation: TypedDocumentNode<unknown, TVars>;
  questions: Question<TVars>[];
  onFinishedRoute: string;
};
