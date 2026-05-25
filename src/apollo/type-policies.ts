import type { TypePolicies } from "@apollo/client";

/**
 * Apollo cache type policies.
 *
 * Apollo auto-normalizes by `id` for any type that has one, so we don't need to
 * declare keyFields here. This file exists for two things:
 *
 *   1. Root-list `merge` functions where the default of warning-then-overwrite
 *      is incorrect. For now every list is "replace wholesale on refetch", so
 *      `(_, incoming) => incoming` is the right default — declared explicitly
 *      to silence Apollo's missing-merge warning for non-normalizable lists.
 *
 *   2. Documentation of which root lists are mutated surgically (`unratedEvents`
 *      via LeaveFeedbackModal) so future contributors know the contract.
 *
 * Pagination is not used anywhere yet. When it lands, replace the relevant
 * merge with one that concatenates instead of replacing.
 */
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
