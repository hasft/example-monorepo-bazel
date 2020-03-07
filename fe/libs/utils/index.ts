import isEmpty from "lodash.isempty";

export function ensureString(val: any): string {
  if (typeof val === "object") {
    return JSON.stringify(val);
  }
  return `${val}`;
}
