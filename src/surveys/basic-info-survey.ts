import {
  AlterProfileBasicInfoDocument,
  AlterProfileBasicInfoMutationVariables,
  Gender,
} from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import { QuestionKind, Survey } from "./types";

export const basicInfoSurvey: Survey<AlterProfileBasicInfoMutationVariables> = {
  id: "basic-info",
  mutation: AlterProfileBasicInfoDocument,
  onFinishedRoute: "/survey/preferences",
  questions: [
    {
      kind: QuestionKind.FullName,
      title: strings.survey.basicInfo.nameTitle,
      field: ["firstName", "lastName"],
      required: true,
    },
    {
      kind: QuestionKind.ProfilePicture,
      title: strings.survey.basicInfo.pictureTitle,
      subtitle: strings.survey.basicInfo.pictureSubtitle,
    },
    {
      kind: QuestionKind.SingleChoice,
      title: strings.survey.basicInfo.genderTitle,
      field: "gender",
      enum: Gender,
      enumNamespace: "enums.gender",
      required: true,
    },
    {
      kind: QuestionKind.TextArea,
      title: strings.survey.basicInfo.bioTitle,
      subtitle: strings.survey.basicInfo.bioSubtitle,
      placeholder: strings.survey.basicInfo.bioPlaceholder,
      field: "bio",
    },
    {
      kind: QuestionKind.DateOfBirth,
      title: strings.survey.basicInfo.dobTitle,
      field: "dateOfBirth",
      required: true,
    },
  ],
};
