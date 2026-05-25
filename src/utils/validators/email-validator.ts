import strings from "@/translations/strings";

export function emailValidator(email: string): string | undefined {
  if (!/^[^\s@]+@[^@\s]+\.[^@\s]+$/.test(email)) return strings.validation.emailInvalid;
}
