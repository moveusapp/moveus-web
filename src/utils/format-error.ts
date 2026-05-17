import {
  CombinedGraphQLErrors,
  ServerError,
  ServerParseError,
} from "@apollo/client/errors";

const GENERIC = "Something went wrong. Please try again.";
const NETWORK = "Couldn't reach the server. Check your connection and retry.";

export function formatError(err: unknown): string {
  if (!err) return "";

  if (CombinedGraphQLErrors.is(err)) {
    const messages = err.errors
      .map((e) => e.message)
      .filter((m): m is string => Boolean(m && m.trim()));
    return messages.length ? messages.join(" ") : GENERIC;
  }

  if (ServerError.is(err) || ServerParseError.is(err)) {
    return NETWORK;
  }

  if (err instanceof Error) {
    if (err.message === "Failed to fetch" || err.name === "NetworkError") {
      return NETWORK;
    }
    return err.message || GENERIC;
  }

  if (typeof err === "string") return err;

  return GENERIC;
}
