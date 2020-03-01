import { Cookie } from '@mm/mds-cookie';
export type Screen = 'mobile' | 'desktop'

export interface MdsApiHeader {
  Authorization: string | undefined | null,
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
  ua: string,
  initURL: string,
  bulkName: string
}

export interface MdsApiStatus {
  
}

export interface MdsServices {}

export type InitSetupArg = {cookie: Cookie, config: MdsApiConfig};

export interface InitialSetup {
  services: MdsServices,  
}

// //

// export interface ForeverBanner {}
// export interface SplashPromo {}
// export interface WebViewURL {}
// export interface ServiceURL {}
// export interface Segment {}

// export interface InitResponse {
//   app_version: any,
//   forever_banner: ForeverBanner,
//   splash_promo: SplashPromo,
//   webview_url: WebViewURL,
//   service_url: ServiceURL,
//   segment: Segment,
//   menu: any,
//   checksum: string,
//   splash_screen: string
// }

