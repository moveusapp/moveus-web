import { ApolloLink } from "@apollo/client";

const isDateStr = (value: string) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(value) ||
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/.test(value) ||
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+\d{2}:\d{2}$/.test(value) ||
  /^\d{4}-\d{2}-\d{2}$/.test(value);

const convertDates = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(convertDates);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, convertDates(value)]),
    );
  }
  if (typeof obj === "string" && isDateStr(obj)) {
    return new Date(obj);
  }
  return obj;
};

export const DateParsingLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    if (response.data) {
      response.data = convertDates(response.data);
    }
    return response;
  }),
);
