import { apolloClient } from "@/appolo/client";
import { UsernameTakenDocument } from "@/graphql/generated";

export function usernameValidator(username: string): string | undefined {
  if (username.length < 3)
    return "Username must be at least 3 characters long.";
  if (username.length > 16)
    return "Username cannot be longer than 16 characters.";
  if (!/^[0-9A-Za-z_]*$/.test(username))
    return "Username can only have alphanumeric characters and underscores.";
}

export function usernameTaken(username: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    apolloClient
      .query({
        query: UsernameTakenDocument,
        variables: { username },
      })
      .then((result) => {
        resolve(result.data.usernameTaken);
      })
      .catch((err) => {});
  });
}
