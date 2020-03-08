import isEmpty from "lodash.isempty";

export function ensureString(val: any): string {
  if (typeof val === "object") {
    return JSON.stringify(val);
  }
  return `${val}`;
}

export function isServer(): boolean {
  return !(typeof window != "undefined" && window.document);
}
