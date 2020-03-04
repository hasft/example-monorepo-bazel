import MobileDetect from "mobile-detect";

export function getScreen(ua: string): "mobile" | "desktop" {
  const md = new MobileDetect(ua);
  return Boolean(md.mobile()) ? "mobile" : "desktop";
}
