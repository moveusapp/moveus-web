import strings from "@/translations/strings";

export function getMonthNames(): string[] {
  const m = strings.months;
  return [
    m.january,
    m.february,
    m.march,
    m.april,
    m.may,
    m.june,
    m.july,
    m.august,
    m.september,
    m.october,
    m.november,
    m.december,
  ];
}
