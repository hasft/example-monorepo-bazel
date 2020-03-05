import { getScreen } from "./utils";
import { create, ApisauceInstance } from "apisauce";
import { MdsConfig } from "mds/fe/libs/mds-types";

export default class MdsApiInstance {
  config: MdsConfig;
  constructor(config: MdsConfig) {
    this.config = config;
  }

  get screen() {
    return getScreen(this.config.ua);
  }

  get headers() {
    return {
      ...this.config.headers,
      client_id: this.config.headers.client_id[this.screen],
      client_secret: this.config.headers.client_secret[this.screen],
      session_id: this.config.headers.session_id,
      client_version: this.config.headers.client_version,
    };
  }

  getSauce(): ApisauceInstance {
    const configByScreen = {
      ...this.config,
      baseURL: this.config.baseURL,
      headers: this.headers,
    };

    const { ua, initBaseURL, accountBaseURL, bulkName, ...rest } = configByScreen;

    const instance = create(rest);

    return instance;
  }
}
