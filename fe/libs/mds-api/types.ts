import { Cookie } from "mds/fe/libs/mds-cookie";
export type Screen = "mobile" | "desktop";

export interface MdsApiHeader {
  Authorization: string | undefined | null;
  device_id: string;
  client_id: {
    desktop: string;
    mobile: string;
  };
  client_secret: {
    desktop: string;
    mobile: string;
  };
}

export interface MdsApiConfig {
  baseURL: string;
  headers: MdsApiHeader;
  ua: string;
  initBaseURL: string;
  bulkName: string;
}

export interface MdsApiStatus {}

export interface MdsServices {}

export interface FetchInitResponse {}

export interface MdsApiParsed {
  services: MdsServices;
}
