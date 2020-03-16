import {
  bind,
  ifElse,
  where,
  prop,
  when,
  complement,
  allPass,
  is,
  propIs,
  pipe,
  andThen,
} from "ramda";
import { create, ApisauceInstance } from "apisauce";
import { Settings, DateTime } from "luxon";
import { isStringAndValid } from "mds/fe/libs/utils";
import { IConfig, ICookie, ICoreOptions } from "mds/fe/libs/mds-types";
import MdsConfig from "./Config";
import MdsCookie from "./Cookie";
import MdsError from "./Error";

function MdsCore(c: IConfig, ck: ICookie, opt: ICoreOptions) {
  let config = MdsConfig(c);
  let cookie = MdsCookie(ck);
  let options = opt;

  const core = {
    setSessionToConfig(session: string) {
      config.setSessionToConfig(session);
      return session;
    },

    setSessionToCookie(session: string) {
      cookie.set("uniqueid", session);
      return session;
    },

    createSession(): string {
      const self = this;
      const conditionOk = where({
        uniqueid: isStringAndValid,
        "user.exp": isPersist,
      });

      return ifElse(
        conditionOk,
        prop("uniqueid"),
        pipe(generateCurrentBase64, self.setSessionToConfig, self.setSessionToCookie),
      )(cookie.getAll());
    },

    createInstance(target: "server" | "client" = "server"): ApisauceInstance {
      const conditionOk = where({
        baseURL: isStringAndValid,
        headers: allPass([
          is(Object),
          propIs(String, "client_id"),
          propIs(String, "client_secret"),
        ]),
      });

      return ifElse(conditionOk, create, createError)(config.getConfig());
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
