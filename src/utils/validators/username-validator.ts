import { apolloClient } from "@/appolo/client";
import { UsernameTakenDocument } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

export function usernameValidator(username: string): string | undefined {
  if (username.length < 3) return strings.validation.usernameTooShort;
  if (username.length > 16) return strings.validation.usernameTooLong;
  if (!/^[0-9A-Za-z_]*$/.test(username)) return strings.validation.usernameInvalidChars;
}

export function usernameTaken(username: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    apolloClient
      .query({
        query: UsernameTakenDocument,
        variables: { username },
      })
      .then((result) => {
        if (result && result.data) {
          resolve(result.data.usernameTaken);
        }
      })
      .catch((err) => {});
  });
}
