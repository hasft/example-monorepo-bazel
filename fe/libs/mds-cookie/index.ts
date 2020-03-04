import Cookie, { CookieSetOptions, CookieGetOptions } from "universal-cookie";
import LZString from "lz-string";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { GetOptions } from "./types";

const listOfKeysOnUserCookie = [
  "user.token",
  "user.exp",
  "user.rf.token",
  "user.mds.token",
  "user.mds.rf.token",
  "user.mds.exp",
  "user.uid",
];

export default class MdsCookie extends Cookie {
  public getUserCookies(options?: GetOptions): any | null {
    const cookies = this.getAll();

    const selected = Object.keys(cookies).reduce((acc, val) => {
      if (listOfKeysOnUserCookie.includes(val)) {
        acc[val] = Boolean(get(options, "decode", false))
          ? decodeURIComponent(cookies[val])
          : cookies[val];
      }

      return acc;
    }, {});

    return isEmpty(selected) ? null : selected;
  }

  encodeLZ(obj: object) {
    return LZString.compressToBase64(JSON.stringify(obj));
  }

  decodeLZ(encoded: string) {
    const decoded = LZString.decompressFromBase64(encoded);
    return isEmpty(decoded) ? null : JSON.parse(decoded);
  }
}

export * from "universal-cookie";
export * from "./types";
