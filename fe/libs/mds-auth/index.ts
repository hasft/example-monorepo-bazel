import isEmpty from "lodash.isempty";
import { MdsUserCookie } from "@matahari/mds-cookie";
import { MdsAuthParsed } from "./types";
import moment from "moment";

export default class MdsAuth {
  cookie: MdsUserCookie;

  constructor(cookie: any) {
    this.cookie = cookie;
  }

  parse(): MdsAuthParsed {
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
