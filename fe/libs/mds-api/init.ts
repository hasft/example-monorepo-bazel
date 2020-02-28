import MdsCookie, {Cookie} from '@mm/mds-cookie';
import MobileDetect from 'mobile-detect';

export default class Init {
  cookie: Cookie;
  userAgent: string;
  
  constructor(cookie, userAgent) {
    this.userAgent = userAgent;
    this.cookie = cookie;
  }

  public isMobile() {
    const md = new MobileDetect(this.userAgent);
    return md.mobile()
  }

  private isInitBulkExisted() {
    const cookie = new MdsCookie(this.cookie);
    return Boolean(cookie.get('init-bulk'));
  }

  private getParsedInitBulk() {
    const cookie = new MdsCookie(this.cookie);
    return cookie.get('init-bulk');
  }

  public fetch() {
    if (this.isInitBulkExisted()) {
      return this.getParsedInitBulk();
    }
    return 'aaa';
  }
}

