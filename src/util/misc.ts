export const trimIndent = function trimIndentFromString(
  ...args: string[]
): string {
  const raw = String.raw.apply(null, args);
  return raw
    .split('\n')
    .map((s) => s.trim())
    .join('\n')
    .replace(/(^\n)|(\n$)/g, '');
};

export const generateDatetime = function generateDatetimeFromDate(
  date: Date
): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
