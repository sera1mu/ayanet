export const generateDatetime = function generateDatetimeFromDate(
  date: Date
): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
