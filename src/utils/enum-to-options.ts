import strings from "@/translations/strings";

function lookup(namespace: string): Record<string, string> {
  const parts = namespace.split(".");
  let node: any = strings;
  for (const part of parts) {
    node = node?.[part];
  }
  return (node ?? {}) as Record<string, string>;
}

function enumToOptions<E extends Record<string, string>>(
  enumObj: E,
  namespace: string,
) {
  const labels = lookup(namespace);
  return (Object.keys(enumObj) as Array<keyof E>).map((key) => {
    const value = enumObj[key];
    return {
      value,
      label: labels[value] ?? labels[key as string] ?? (value as string),
    };
  });
}

export { enumToOptions };
