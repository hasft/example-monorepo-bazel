export * from "./types-api-response";

export type Screen = "mobile" | "desktop";

export type MdsUserStatus = "unknown" | "guest" | "with_thor";

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
  status: MdsUserStatus;
  isVerified: boolean;
  token: {
    matahari: string | null | undefined;
    ovo: string | null | undefined;
  };
  isExpired: {
    matahari: boolean | null | undefined;
    ovo: boolean | null | undefined;
  };
};

export type MdsUserCookie = {
  "user.token": string;
  "user.exp": string;
  "user.rf.token": string;
  "user.mds.token": string;
  "user.mds.rf.token": string | "undefined";
  "user.mds.exp": string | "undefined";
  uid: string;
};

export type MdsParsedUserCookie = {
  token: string;
  expires_in: string;
  refresh_token: string;
  token_type?: string;
  ip_address?: string;
  thor_token?: string;
  thor_refresh_token?: string;
  thor_expiration?: string;
  enc_userId: string;
};

export type OptionsGetUserCookie = {
  decodeVal?: boolean;
};

export type MdsInitResponse = {};
