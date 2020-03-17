export * from "./functional";

export function isServer(): boolean {
  return !(typeof window != "undefined" && window.document);
}
