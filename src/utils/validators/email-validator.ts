import { apolloClient } from "@/appolo/client";
import { EmailTakenDocument } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

export function emailValidator(email: string): string | undefined {
  if (!/^[^\s@]+@[^@\s]+\.[^@\s]+$/.test(email)) return strings.validation.emailInvalid;
}

export function emailTaken(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    apolloClient
      .query({
        query: EmailTakenDocument,
        variables: { email },
      })
      .then((result) => {
        if (result && result.data) {
          resolve(result.data.emailTaken);
        }
      })
      .catch((err) => {});
  });
}
