import { ApiResponse } from "apisauce";
import get from "lodash.get";
import { Cookie } from "universal-cookie";
import moment from "moment-timezone";
import isEmpty from "lodash.isempty";
import MdsApiInstance from "mds/fe/libs/mds-instance";
import MdsCookie from "mds/fe/libs/mds-cookie";
import MdsApiError from "mds/fe/libs/mds-error";
import { ensureString, isServer } from "mds/fe/libs/utils";
import {
  MdsConfig,
  MdsAuthParsed,
  MdsResponseAnonymousUser,
  MdsParsedUserCookie,
  MdsUserStatus,
} from "mds/fe/libs/mds-types";

export default class MdsAuth {
  cookie: MdsCookie;
  config: MdsConfig;

  constructor(config: MdsConfig, cookie: MdsCookie) {
    this.cookie = cookie;
    this.config = config;
  }

  private generateSessionId(): string {
    const now = new Buffer(`${new Date()}`);
    return now.toString("base64");
  }

  private parseAuthResponse(res: MdsResponseAnonymousUser): MdsParsedUserCookie | {} {
    if (isEmpty(res)) {
      return {};
    } else {
      const obj = {
        token: ensureString(get(res, "token")),
        expires_in: ensureString(get(res, "expires_in")),
        refresh_token: ensureString(get(res, "refresh_token")),
        thor_token: ensureString(get(res, "thor_token")),
        thor_refresh_token: ensureString(get(res, "thor_refresh_token")),
        thor_expiration: ensureString(get(res, "thor_expiration")),
        enc_userId: ensureString(get(res, ["info", "enc_userid"])),
      };

      return Object.keys(obj).reduce((acc, val) => {
        if (obj[val] !== "undefined" && obj[val] !== "null") {
          acc[val] = obj[val];
        }
        return acc;
      }, {});
    }
  }

  private getStatus(): MdsUserStatus {
    const mdsCookie = new MdsCookie(this.cookie);
    const uid: string | null = mdsCookie.get("uid");
    const ovoExpiration: string | null = mdsCookie.get("user.mds.exp");

    if (isEmpty(ovoExpiration) && !isEmpty(uid)) {
      return "guest";
    } else if (!isEmpty(ovoExpiration)) {
      return "with_thor";
    } else {
      return "unknown";
    }
  }

  private isExpired(): boolean | undefined {
    const mdsCookie = new MdsCookie(this.cookie);
    const userStatus = this.getStatus();

    const now = isServer
      ? moment()
          .tz(moment.tz.zonesForCountry("ID")[0])
          .format("YYYY-MM-DD HH:mm:ss")
      : moment().format("YYYY-MM-DD HH:mm:ss");

    switch (userStatus) {
      case "guest":
        const guestExp = mdsCookie.get("user.exp");
        return guestExp ? moment(decodeURIComponent(guestExp)).isBefore(now) : true;
      case "with_thor":
        const ovoExp = mdsCookie.get("user.mds.exp");
        return ovoExp ? moment(decodeURIComponent(ovoExp)).isBefore(now) : true;
      case "unknown":
        return true;
      default:
        return true;
    }
  }

  // private isExpired(expirationTime) {

  //   if (isEmpty(expirationTime) ) return undefined;

  //   const now = moment();
  //   const momentExpired = moment(decodeURIComponent(expirationTime), "YYYY-MM-DDTHH:mm:ss.SSSZ");

  //   return momentExpired.isBefore(now);
  // }

  // private async loginAsGuest(): Promise<any> {
  //   if (isEmpty(this.config)) {
  //     return await Promise.reject(new MdsApiError({ code: "constructor", message: "no config" }));
  //   }

  //   const instance = new MdsApiInstance(this.config);
  //   const api = instance.getSauce();

  //   api.setBaseURL(this.config.accountBaseURL);
  //   api.setHeaders({ ...instance.headers, session_id: this.generateSessionId() });

  //   const response = await api.post("/v1/auth/anonymouslogin", {
  //     device_id: this.config.headers.device_id,
  //     client_secret: this.config.headers.client_secret[instance.screen],
  //   });

  //   return response;
  // }

  // private async getUser(): Promise<MdsParsedUserCookie | MdsApiError | {}> {
  //   const mdsCookie = new MdsCookie(this.cookie);
  //   const uidCookie = mdsCookie.get("uid");

  //   if (isEmpty(uidCookie)) {
  //     const { ok, problem, data } = await this.loginAsGuest();

  //     if (ok) {
  //       const res = data.data;
  //       return this.parseAuthResponse(res);
  //     } else {
  //       return new MdsApiError({ code: problem, message: "failed" });
  //     }
  //   } else {
  //     return mdsCookie.parseUserCookie();
  //   }
  // }

  // private parse(user: MdsParsedUserCookie): MdsAuthParsed {
  //   return {
  //     status: this.getStatus(user.enc_userId, user.thor_expiration),
  //     isVerified: undefined,
  //     token: {
  //       matahari: user.token,
  //       ovo: user.thor_token,
  //     },
  //     isExpired: {
  //       matahari: this.isExpired(user.expires_in),
  //       ovo: this.isExpired(user.thor_expiration),
  //     },
  //   };
  // }
}
