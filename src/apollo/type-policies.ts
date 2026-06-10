import type { PossibleTypesMap, TypePolicies } from "@apollo/client";

export const possibleTypes: PossibleTypesMap = {
  FeedItemUnion: ["EventType", "PostType"],
  SearchUnion: ["EventType", "PostType", "UserType"],
  BaseNotificationType: ["EventNotificationType", "UserNotificationType"],
};

export const typePolicies: TypePolicies = {
  Queries: {
    fields: {
      unratedEvents: { merge: (_existing, incoming) => incoming },
      anonymousUserEvents: { merge: (_existing, incoming) => incoming },
      myFeed: { merge: (_existing, incoming) => incoming },
      myNotifications: { merge: (_existing, incoming) => incoming },
    },
  },
};
