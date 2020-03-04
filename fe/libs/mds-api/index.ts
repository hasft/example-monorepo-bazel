import get from "lodash.get";
import isEmpty from "lodash.isempty";
import MobileDetect from "mobile-detect";
import MdsApiCookie, { Cookie } from "mds/fe/libs/mds-cookie";
import MdsApiInstance from "./instance";
import { ApiResponse } from "apisauce";
import { MdsApiParsed, MdsApiConfig, MdsApiHeader, FetchInitResponse } from "./types";

class MdsApiError {
  code: string;
  message: string;

  constructor({ code, message }) {
    this.code = code;
    this.message = message;
  }
}

export default class MdsApi {
  config: MdsApiConfig;
  cookie: Cookie;

  constructor(config: MdsApiConfig, cookie: Cookie) {
    if (isEmpty(config) || isEmpty(cookie)) {
      console.warn("argument config and cookie is required");
    }

    //TODO: validate config
    this.config = config;
    this.cookie = cookie;
  }

  async fetchInit(): Promise<any> {
    const api = new MdsApiInstance({ ...this.config, baseURL: this.config.initBaseURL }).getSauce();
    const response = await api.get("/v1/init?platform=mobilesite&version=1.22.0");

    return response;
  }

  async getBulk(): Promise<FetchInitResponse | MdsApiError> {
    const cookie = new MdsApiCookie(this.cookie);
    const bulk = cookie.get(this.config.bulkName);

    if (isEmpty(bulk)) {
      const { ok, problem, data } = await this.fetchInit();

      if (ok) {
        return data;
      } else {
        console.log("HERE", problem);
        return new MdsApiError({ code: problem, message: data });
      }
    } else {
      return cookie.decodeLZ(bulk);
    }
  }

  getServices() {
    const cookie = new MdsApiCookie(this.cookie);
    const bulk = cookie.get(this.config.bulkName);
    const decodedBulk = cookie.decodeLZ(bulk);

    return decodedBulk ? { [this.config.bulkName]: decodedBulk } : null;
  }

  parse(): any {
    return { services: null };
  }
}
