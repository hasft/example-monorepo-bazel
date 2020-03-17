import {
  ifElse,
  where,
  prop,
  when,
  allPass,
  is,
  propIs,
  pipe,
  compose,
  has,
  andThen,
  pick,
} from "ramda";
import { create, ApisauceInstance } from "apisauce";
import { Settings, DateTime } from "luxon";
import { isStringAndValid } from "mds/fe/libs/utils";
import { IConfig, ICookie, ICoreOptions, ICoreError } from "mds/fe/libs/mds-types";
import MdsConfig from "./Config";
import MdsCookie from "./Cookie";
import MdsError from "./Error";

function MdsCore(c: IConfig, ck: ICookie, opt: ICoreOptions) {
  let config = MdsConfig(c);
  let cookie = MdsCookie(ck);
  let instance: ApisauceInstance = create(c);
  let options = opt;

  const core = {
    getConfig() {
      return config.getConfig();
    },

    getCookie() {
      return cookie.getAll();
    },

    getInstance() {
      return instance;
    },

    createSession(): string {
      const conditionOk = where({
        uniqueid: isStringAndValid,
        "user.exp": isPersist,
      });

      return ifElse(conditionOk, prop("uniqueid"), generateCurrentBase64)(cookie.getAll());
    },

    setSessionToConfig(session: string) {
      config.setSessionToConfig(session);
    },

    setSessionToCookie(session: string) {
      cookie.set("uniqueid", session);
    },

    setSessionToCookieAndConfig(session: string) {
      const self = this;
      self.setSessionToCookie(session);
      self.setSessionToConfig(session);
    },

    updateInstance(config: IConfig) {
      const baseURL = config.baseURL;
      const headers = config.headers;

      instance.setBaseURL(baseURL);
      instance.setHeaders({ ...instance.headers, ...headers });
    },

    fetchInit(): Promise<any> | ICoreError {
      const isConfigReady = where({
        baseURL: propIs(String),
        headers: allPass([
          has("session_id"),
          has("client_id"),
          has("client_secret"),
          has("device_id"),
          has("client_version"),
        ]),
      });

      return ifElse(
        isConfigReady,
        async () => await instance.get("/promo/v1/init?platform=mobilesite&version=1.22.0"),
        () => createError("config not ready"),
      )(config.getConfig);
    },
  };

  function createError(msg: string) {
    return MdsError(msg);
  }

  function isPersist(expiration: string) {
    Settings.defaultZoneName = "Asia/Jakarta";
    const exp = DateTime.fromSQL(decodeURIComponent(expiration)).valueOf();
    const now = DateTime.local().valueOf();
    return now < exp;
  }

  function generateCurrentBase64() {
    Settings.defaultZoneName = "Asia/Jakarta";
    const now = DateTime.local().toString();
    return new Buffer(now).toString("base64");
  }

  return core;
}

export default MdsCore;
