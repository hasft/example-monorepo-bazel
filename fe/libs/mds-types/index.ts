interface IHeaderConfig {
  Authorization?: string;
  session_id?: string;
  client_id: string;
  client_secret: string;
  client_version: string;
  device_id: string;
}

export interface IConfig {
  baseURL: string;
  headers: IHeaderConfig;
}

export interface ICookie {
  uniqueid?: string;
}
export interface ICoreOptions {
  defaultTimeZone?: string;
}
