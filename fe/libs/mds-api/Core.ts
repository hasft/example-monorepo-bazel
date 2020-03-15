import { ifElse, where, has, prop } from "ramda";
import { Settings, DateTime } from "luxon";
import Cookie from "universal-cookie";
import { isStringAndValid } from "mds/fe/libs/utils";

export interface IConfig {}
export interface IMdsConfig {}
export interface ICookie {}
export interface ICoreOptions {
  defaultTimeZone?: string;
}

class MdsConfig {
  constructor(config: IConfig) {}
}

class MdsCookie extends Cookie {}

class MdsCore {
  config: MdsConfig;
  cookie: MdsCookie;
  options: ICoreOptions;

  constructor(config: IConfig, cookie: ICookie, options: ICoreOptions) {
    this.config = new MdsConfig(config);
    this.cookie = new MdsCookie(cookie);
    this.options = options;
  }

  isPersist(expiration: string) {
    Settings.defaultZoneName = "Asia/Jakarta";
    const exp = DateTime.fromSQL(decodeURIComponent(expiration)).valueOf();
    const now = DateTime.local().valueOf();
    return now < exp;
  }

  createSession() {
    Settings.defaultZoneName = "Asia/Jakarta";
    const now = DateTime.local().toString();
    return new Buffer(now).toString("base64");
  }

  handleSession(): string {
    const cookie: ICookie = this.cookie.getAll();

    const conditionOk = where({
      uniqueid: isStringAndValid,
      "user.exp": this.isPersist,
    });

    return ifElse(conditionOk, prop("uniqueid"), this.createSession)(cookie);
  }
}

export { MdsCore };
