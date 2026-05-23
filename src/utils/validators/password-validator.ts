import strings from "@/translations/strings";

export function passwordValidator(password: string): string | undefined {
  if (password.length < 8) return strings.validation.passwordTooShort;
  if (!/[a-z]/.test(password)) return strings.validation.passwordNeedsLowercase;
  if (!/[A-Z]/.test(password)) return strings.validation.passwordNeedsUppercase;
  if (!/[0-9]/.test(password)) return strings.validation.passwordNeedsNumber;
  if (!/\W/.test(password)) return strings.validation.passwordNeedsSpecial;
}
