import get from "lodash.get";
import isEmpty from "lodash.isempty";
import MobileDetect from "mobile-detect";
import MdsApiCookie, { Cookie } from "mds/fe/libs/mds-cookie";
import MdsApiInstance from "./instance";
import MdsApiError from "./error";
import { ApiResponse } from "apisauce";
import { MdsApiParsed, MdsApiConfig, MdsApiHeader, FetchInitResponse } from "./types";
import { getScreen } from "./utils";

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

  private async fetchInit(): Promise<any> {
    const api = new MdsApiInstance({ ...this.config, baseURL: this.config.initBaseURL }).getSauce();
    const platform = getScreen(this.config.ua) === "desktop" ? "website" : "mobilesite";
    const response = await api.get(`/v1/init?platform=${platform}&version=1.22.0`);

    return response;
  }

  async getBulk(): Promise<FetchInitResponse | MdsApiError> {
    const cookie = new MdsApiCookie(this.cookie);
    const bulk = cookie.get(this.config.bulkName);

    if (isEmpty(bulk)) {
      const { ok, problem, data } = await this.fetchInit();

      if (ok) {
        return data.data;
      } else {
        return new MdsApiError({ code: problem, message: data });
      }
    } else {
      return cookie.decodeLZ(bulk);
    }
  }

  async getSegment() {
    const bulk = await this.getBulk();
    return get(bulk, "segment");
  }

  async getServices() {
    const bulk = await this.getBulk();
    return get(bulk, "service_url");
  }

  parse() {
    return {
      services: this.getServices(),
      segment: this.getSegment(),
    };
  }
}
