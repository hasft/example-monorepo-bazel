import { MdsApiConfig } from ".";
import get from 'lodash.get';

export type Screen = 'mobile' | 'desktop'

export default class MdsApiInstance {
  config: MdsApiConfig;
  screen: Screen;
  
  constructor(obj: {screen: Screen, config: MdsApiConfig}) {
    this.screen = obj.screen;
    this.config = obj.config;
  }

  getInstanceConfig(screen) {
    const {ua, ...rest} = this.config;

    return {
      ...rest,
      headers: {
        ...rest.headers,
        client_id: get(rest, `headers.client_id.${screen}`),
        client_secret: get(rest, `headers.client_secret.${screen}`)
      }
    }
  }

  public create() {
    const headers = this.getInstanceConfig(this.screen);
    return headers;
  }
}
