import MobileDetect from "mobile-detect"
import MdsApiInstance from "./instance"

export interface MdsApiHeader {
  device_id: string,
  client_id: {
    desktop: string,
    mobile: string
  },
  client_secret: {
    desktop: string,
    mobile: string
  }
}

export interface MdsApiConfig {
  baseURL: string,
  headers: MdsApiHeader,
  ua: string
}

export default class MdsApi {
  config: MdsApiConfig;
  
  constructor(config) {
    this.config = config;
  }

  private isMobile() {
    return new MobileDetect(this.config.ua).mobile()
  }

  private getScreen() {
    return this.isMobile() ? 'mobile' : 'desktop'
  }

  build() {
    return new MdsApiInstance({
      screen: this.getScreen(),
      config: this.config
    }).create()
  }
}


