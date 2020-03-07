import { ApiResponse } from "apisauce";
import { Cookie } from "universal-cookie";
import isEmpty from "lodash.isempty";
import MdsApiInstance from "mds/fe/libs/mds-instance";
import MdsCookie from "mds/fe/libs/mds-cookie";
import MdsApiError from "mds/fe/libs/mds-error";
import {
  MdsConfig,
  MdsAuthParsed,
  MdsResponseAnonymousUser,
  MdsUserStatus,
  MdsUserCookie,
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

  private async loginAsGuest(): Promise<any> {
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

  getUserStatus(): MdsUserStatus {
    const mdsCookie = new MdsCookie(this.cookie);
    const ovoTokenExpiredTime = mdsCookie.get("user.mds.exp");
    // const userToken = mdsCookie.get("user.token");
    const isLogin = mdsCookie.get("isLogin");

    if (isLogin === "false" && ovoTokenExpiredTime === "undefined") {
      return "guest";
    } else if (isLogin === "true" && ovoTokenExpiredTime !== "undefined") {
      return "with_thor";
    } else {
      return "unknown";
    }
  }

  async getUser(): Promise<MdsUserCookie | MdsApiError> {
    const mdsCookie = new MdsCookie(this.cookie);
    const uidCookie = mdsCookie.get("user.uid");
    if (isEmpty(uidCookie)) {
      const { ok, problem, data } = await this.loginAsGuest();

      if (ok) {
        const res: MdsResponseAnonymousUser = data.data;
        return mdsCookie.createUserCookie(res);
      } else {
        return new MdsApiError({ code: problem, message: data });
      }
    } else {
      return mdsCookie.getUserCookie();
    }
  }

  async parse(): Promise<MdsAuthParsed> {
    return {
      status: "unknown",
      isExpired: false,
      isVerified: false,
      token: {
        matahari: null,
        ovo: null,
      },
    };
  }
}
