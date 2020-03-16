import {
  ifElse,
  where,
  has,
  prop,
  when,
  complement,
  isNil,
  allPass,
  is,
  propIs,
  Arity1Fn,
} from "ramda";
import { create, ApisauceInstance } from "apisauce";
import { Settings, DateTime } from "luxon";
import Cookie from "universal-cookie";
import { isStringAndValid } from "mds/fe/libs/utils";

export interface IConfig {
  baseURL: string;
}
export interface ICookie {}
export interface ICoreOptions {
  defaultTimeZone?: string;
}

class MdsConfig {
  private config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}

class MdsCookie extends Cookie {}

export class MdsError {
  msg: string;
  constructor(msg: string) {
    this.msg = msg;
  }
}

class MdsCore {
  config: MdsConfig;
  cookie: MdsCookie;
  options: ICoreOptions;

  constructor(config: IConfig, cookie: ICookie, options: ICoreOptions) {
    this.config = new MdsConfig(config);
    this.cookie = new MdsCookie(cookie);
    this.options = options;
  }

  private isPersist(expiration: string) {
    Settings.defaultZoneName = "Asia/Jakarta";
    const exp = DateTime.fromSQL(decodeURIComponent(expiration)).valueOf();
    const now = DateTime.local().valueOf();
    return now < exp;
  }

  private createSession() {
    Settings.defaultZoneName = "Asia/Jakarta";
    const now = DateTime.local().toString();
    return new Buffer(now).toString("base64");
  }

  private handleSession(): string {
    const cookie: ICookie = this.cookie.getAll();

    const conditionOk = where({
      uniqueid: isStringAndValid,
      "user.exp": this.isPersist,
    });

    return ifElse(conditionOk, prop("uniqueid"), this.createSession)(cookie);
  }

  private createError(msg: string) {
    return new MdsError(msg);
  }

  createInstance(): any {
    const config = this.config.getConfig();
    const conditionOk = where({
      baseURL: isStringAndValid,
      headers: allPass([is(Object), propIs(String, "client_id"), propIs(String, "client_secret")]),
    });

    return ifElse(conditionOk, create, this.createError)(config);
  }
}

export { MdsCore };
