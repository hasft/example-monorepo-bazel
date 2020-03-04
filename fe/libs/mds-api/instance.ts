import { MdsApiConfig } from "./types";
import { getScreen } from "./utils";
import { create, ApisauceInstance } from "apisauce";

export default class MdsApiInstance {
  config: MdsApiConfig;
  constructor(config: MdsApiConfig) {
    this.config = config;
  }

  get screen() {
    return getScreen(this.config.ua);
  }

  getSauce(): ApisauceInstance {
    const configByScreen = {
      ...this.config,
      baseURL: this.config.baseURL,
      headers: {
        ...this.config.headers,
        client_id: this.config.headers.client_id[this.screen],
        client_secret: this.config.headers.client_secret[this.screen],
      },
    };

    const { ua, initBaseURL, bulkName, ...rest } = configByScreen;

    const instance = create(rest);

    return instance;
  }
}
