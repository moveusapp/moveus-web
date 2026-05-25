import strings from "@/translations/strings";

function lookup(namespace: string): Record<string, string> {
  const parts = namespace.split(".");
  let node: unknown = strings;
  for (const part of parts) {
    node = (node as Record<string, unknown> | null | undefined)?.[part];
  }
  return (node ?? {}) as Record<string, string>;
}

export function enumToOptions<E extends Record<string, string>>(
  enumObj: E,
  namespace: string,
): { value: E[keyof E]; label: string }[] {
  const labels = lookup(namespace);
  return (Object.keys(enumObj) as Array<keyof E>).map((key) => {
    const value = enumObj[key];
    return {
      value,
      label: labels[value] ?? labels[key as string] ?? (value as string),
    };
  });
}
