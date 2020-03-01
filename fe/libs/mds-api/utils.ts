import MobileDetect from 'mobile-detect';

export function getScreen(ua: string) {
  const md = new MobileDetect(ua);
  return Boolean(md.mobile()) ? 'mobile' : 'desktop';
}
