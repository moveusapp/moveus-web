// src/apollo/client.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  ServerError,
} from "@apollo/client/errors";
import { createClient } from "graphql-ws";
import { isSubscriptionOperation } from "@apollo/client/utilities";
import { DateParsingLink } from "./date-parsing-link";
import { clearStoredProfile } from "@/utils/auth";

const isDev = import.meta.env.DEV;
const secure = isDev ? "" : "s";
const apiHost = import.meta.env.VITE_API_HOST ?? "localhost:8000";

const httpLink = new HttpLink({
  uri: `http${secure}://${apiHost}/graphql`,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws${secure}://${apiHost}/graphql`,
  }),
);

const splitLink = ApolloLink.split(
  ({ query }) => isSubscriptionOperation(query),
  wsLink,
  httpLink,
);

const UNAUTHORIZED_CODE = 100;

const redirectToLogin = () => {
  clearStoredProfile();
  void apolloClient.clearStore();
  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
};

const authErrorLink = new ErrorLink(({ error }) => {
  if (ServerError.is(error) && error.statusCode === 401) {
    redirectToLogin();
    return;
  }
  if (CombinedGraphQLErrors.is(error)) {
    const isAuth = error.errors.some(
      (e) => e.error_code === UNAUTHORIZED_CODE,
    );
    if (isAuth) redirectToLogin();
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authErrorLink, DateParsingLink, splitLink]),
  cache: new InMemoryCache(),
});
