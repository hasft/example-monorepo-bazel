import get from "lodash.get";
import isEmpty from "lodash.isempty";
import MobileDetect from "mobile-detect";
import MdsApiCookie from "mds/fe/libs/mds-cookie";
import MdsApiInstance from "mds/fe/libs/mds-instance";
import MdsApiError from "mds/fe/libs/mds-error";
import { getScreen } from "./utils";
import { MdsConfig, MdsInitResponse } from "mds/fe/libs/mds-types";
import { Cookie } from "universal-cookie";

export default class MdsApi {
  config: MdsConfig;
  cookie: Cookie;

  constructor(config: MdsConfig, cookie: Cookie) {
    if (isEmpty(config) || isEmpty(cookie)) {
      console.warn("argument config and cookie is required");
    }

    //TODO: validate config
    this.config = config;
    this.cookie = cookie;
  }

  private async fetchInit(): Promise<any> {
    const api = new MdsApiInstance(this.config).getSauce();
    api.setBaseURL(this.config.initBaseURL);
    const platform = getScreen(this.config.ua) === "desktop" ? "website" : "mobilesite";
    const response = await api.get(`/v1/init?platform=${platform}&version=1.22.0`);

    return response;
  }

  async getBulk(): Promise<MdsInitResponse | MdsApiError> {
    const cookie = new MdsApiCookie(this.cookie);
    const bulk = cookie.get(this.config.bulkName + "init");

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

  async getAuth() {
    //    const auth = new MdsApiAuth(this.cookie);
  }

  async getSegment() {
    const bulk = await this.getBulk();
    return get(bulk, "segment");
  }

  async getServices() {
    const bulk = await this.getBulk();
    return get(bulk, "service_url");
  }

  async parse() {
    return {
      services: await this.getServices(),
      segment: await this.getSegment(),
      auth: await this.getAuth(),
    };
  }
}
