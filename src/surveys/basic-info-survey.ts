import {
  AlterProfileBasicInfoDocument,
  AlterProfileBasicInfoMutationVariables,
  Gender,
} from "@/graphql/graphql-types";
import { QuestionKind, Survey } from "./types";

export const basicInfoSurvey: Survey<AlterProfileBasicInfoMutationVariables> = {
  id: "basic-info",
  mutation: AlterProfileBasicInfoDocument,
  onFinishedRoute: "/survey/preferences",
  questions: [
    {
      kind: QuestionKind.FullName,
      title: "What is your name?",
      field: ["firstName", "lastName"],
      required: true,
    },
    {
      kind: QuestionKind.SingleChoice,
      title: "What is your gender?",
      field: "gender",
      enum: Gender,
      required: true,
    },
    {
      kind: QuestionKind.TextArea,
      title: "Tell us about yourself",
      field: "bio",
    },
    {
      kind: QuestionKind.DateOfBirth,
      title: "When were you born?",
      field: "dateOfBirth",
      required: true,
    },
  ],
};
