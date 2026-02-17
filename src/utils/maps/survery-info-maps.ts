import {
  FormedRelationshipsType,
  FrequencyOfPhycicalActivity,
  GenderNoPnts,
  MainInterest,
  MatchedParticipationLikelihood,
  PhysicalActivitySatisfaction,
  PreferredPartnerCharacteristics,
  PreferredPartySize,
  SocialInteractionImportance,
  SurveyFragment,
  TimeOfTheDay,
} from "@/graphql/generated";
import { enumToOptions } from "../enum-to-options";

export function surveyInfoKeyToTitle(key: keyof SurveyFragment): string {
  switch (key) {
    case "formedRelationshipTypes":
      return "What relationships have you formed through physical activities?";
    case "frequencyOfPhysicalActivity":
      return "How often do you participate in physical activities?";
    case "genderPreference":
      return "Which genders do you prefer to be around?";
    case "matchedParticipationLikelihood":
      return "How likely are you to go on an event with someone because of your similar personality?";
    case "physicalActivitySatisfaction":
      return "How satisfied are you with your activity levels?";
    case "preferredPartnerCharacteristics":
      return "What do you value the most in people you spend time with?";
    case "preferredPartySize":
      return "What is your ideal group size for participating in physical activities?";
    case "preferredTimeOfTheDay":
      return "In what times of the day do you prefer so exercise?";
    case "socialInteractionImportance":
      return "How important is soicalizing for you?";
    case "mainInterest":
      return "What are you mainly looking to get from this app?";
  }
  throw Error("Invalid surveyinfo key");
}

export function surveyInfoKeyToEnum(
  key: keyof SurveyFragment,
): Record<string, string> {
  switch (key) {
    case "formedRelationshipTypes":
      return FormedRelationshipsType;
    case "frequencyOfPhysicalActivity":
      return FrequencyOfPhycicalActivity;
    case "genderPreference":
      return GenderNoPnts;
    case "matchedParticipationLikelihood":
      return MatchedParticipationLikelihood;
    case "physicalActivitySatisfaction":
      return PhysicalActivitySatisfaction;
    case "preferredPartnerCharacteristics":
      return PreferredPartnerCharacteristics;
    case "preferredPartySize":
      return PreferredPartySize;
    case "preferredTimeOfTheDay":
      return TimeOfTheDay;
    case "socialInteractionImportance":
      return SocialInteractionImportance;
    case "mainInterest":
      return MainInterest;
  }
  throw Error("Invalid surveyinfo key");
}

export function surveyInfoKeyToOptions(
  key: keyof SurveyFragment,
): Option<string>[] {
  return enumToOptions(surveyInfoKeyToEnum(key));
}
