import { Survey } from "./types";
import { basicInfoSurvey } from "./basic-info-survey";
import { preferencesSurvey } from "./preferences-survey";

export const surveys: Record<string, Survey<any>> = {
  [basicInfoSurvey.id]: basicInfoSurvey,
  [preferencesSurvey.id]: preferencesSurvey,
};
