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
  // graphql-codegen alphabetizes enum members, which scrambles semantically
  // ordered enums (days, skill levels, scales). The translation file is
  // hand-authored in the intended order, so we use its key order as canonical.
  const order = Object.keys(labels);
  return (Object.keys(enumObj) as Array<keyof E>)
    .map((key) => {
      const value = enumObj[key];
      return {
        value,
        label: labels[value] ?? labels[key as string] ?? (value as string),
      };
    })
    .sort((a, b) => {
      const ia = order.indexOf(a.value as string);
      const ib = order.indexOf(b.value as string);
      if (ia === -1) return ib === -1 ? 0 : 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
}
