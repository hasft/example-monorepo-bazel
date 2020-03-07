import Cookie, { CookieSetOptions, CookieGetOptions } from "universal-cookie";
import LZString from "lz-string";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { ensureString } from "mds/fe/libs/utils";
import {
  OptionsGetUserCookie,
  MdsUserCookie,
  MdsResponseAnonymousUser,
  MdsParsedUserCookie,
} from "mds/fe/libs/mds-types";

const listOfKeysOnUserCookie = [
  "user.token",
  "user.exp",
  "user.rf.token",
  "user.mds.token",
  "user.mds.rf.token",
  "user.mds.exp",
  "user.uid",
  "isLogin",
];

export default class MdsCookie extends Cookie {
  getUserCookie(options: OptionsGetUserCookie = { decodeVal: false }): MdsUserCookie | {} {
    const cookies = this.getAll();

    return Object.keys(cookies).reduce((acc, val) => {
      if (listOfKeysOnUserCookie.includes(val)) {
        acc[val] = get(options, "decode", false) ? decodeURIComponent(cookies[val]) : cookies[val];
      }

      return acc;
    }, {});
  }

  private parseUserCookie(options: OptionsGetUserCookie): MdsParsedUserCookie | {} {
    const data = this.getUserCookie(options);

    if (isEmpty(data)) {
      return {};
    } else {
      return {
        token: ensureString(get(data, "user.token")),
        expires_in: ensureString(get(data, "user.exp")),
        refresh_token: ensureString(get(data, "user.rf.token")),
        thor_token: ensureString(get(data, "user.mds.rf.token")),
        thor_refresh_token: ensureString(get(data, "user.mds.rf.token")),
        thor_expiration: ensureString(get(data, "user.mds.exp")),
        enc_userId: ensureString(get(data, "info.enc_userid")),
        isLogin: Boolean(get(data, "isLogin")),
      };
    }
  }

  encodeLZ(obj: object) {
    return LZString.compressToBase64(JSON.stringify(obj));
  }

  decodeLZ(encoded: string) {
    const decoded = LZString.decompressFromBase64(encoded);
    return isEmpty(decoded) ? null : JSON.parse(decoded);
  }
}
