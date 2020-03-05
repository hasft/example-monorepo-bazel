export type Screen = "mobile" | "desktop";

export type MdsHeader = {
  Authorization?: string | undefined | null;
  device_id: string;
  client_id: {
    desktop: string;
    mobile: string;
  };
  client_secret: {
    desktop: string;
    mobile: string;
  };
  client_version: string;
  session_id?: string;
};

export type MdsConfig = {
  baseURL: string;
  headers: MdsHeader;
  ua: string;
  initBaseURL: string;
  accountBaseURL: string;
  bulkName: string;
};

export type MdsAuthParsed = {
  status: "unknown" | "guest" | "with_thor" | "without_thor";
  isExpired: boolean;
  isVerified: boolean;
  token: {
    matahari: string | null;
    ovo: string | null;
  };
};

export type MdsUserCookie = {
  [key: string]: string;
};

export type OptionsGetUserCookie = {
  decodeVal: boolean;
};

export type MdsInitResponse = {};
