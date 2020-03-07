import { ApiResponse } from "apisauce";
import get from "lodash.get";
import { Cookie } from "universal-cookie";
import isEmpty from "lodash.isempty";
import MdsApiInstance from "mds/fe/libs/mds-instance";
import MdsCookie from "mds/fe/libs/mds-cookie";
import MdsApiError from "mds/fe/libs/mds-error";
import { ensureString } from "mds/fe/libs/utils";
import {
  MdsConfig,
  MdsAuthParsed,
  MdsResponseAnonymousUser,
  MdsParsedUserCookie,
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

  private parseAuthResponse(res: MdsResponseAnonymousUser): MdsParsedUserCookie {
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

  private async loginAsGuest(): Promise<any> {
    if (isEmpty(this.config)) {
      return await Promise.reject(new MdsApiError({ code: "constructor", message: "no config" }));
    }

    const instance = new MdsApiInstance(this.config);
    const api = instance.getSauce();

    api.setBaseURL(this.config.accountBaseURL);
    api.setHeaders({ ...instance.headers, session_id: this.generateSessionId() });

    const response = await api.post("/v1/auth/anonymouslogin", {
      device_id: this.config.headers.device_id,
      client_secret: this.config.headers.client_secret[instance.screen],
    });

    return response;
  }

  async getUser(): Promise<MdsParsedUserCookie | MdsApiError> {
    const mdsCookie = new MdsCookie(this.cookie);
    const uidCookie = mdsCookie.get("user.uid");

    if (isEmpty(uidCookie)) {
      const { ok, problem, data } = await this.loginAsGuest();

      if (ok) {
        const res = data.data;
        return this.parseAuthResponse(res);
      } else {
        return new MdsApiError({ code: problem, message: data });
      }
    } else {
      return mdsCookie.parseUserCookie();
    }
  }

  async parse(): Promise<MdsAuthParsed> {
    const user = await this.getUser();

    return {
      status: "unknown",
      isExpired: true,
      isVerified: false,
      token: {
        matahari: null,
        ovo: null,
      },
    };
  }
}
