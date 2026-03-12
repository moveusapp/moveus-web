import { ApolloLink } from "@apollo/client";
import { map } from "rxjs/operators";

const isDateStr = (value: string): boolean => {
  const iso8601Pattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?([Zz]|[+-]\d{2}:\d{2})?)?$/;
  
  if (!iso8601Pattern.test(value)) {
    return false;
  }
  
  const date = new Date(value);
  return !isNaN(date.getTime());
};

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

export const DateParsingLink = new ApolloLink((operation, forward) => {
  return forward(operation).pipe(
    map((response: any) => {
      if (response?.data) {
        response.data = convertDates(response.data);
      }
      return response;
    }),
  );
});
