import { prop, allPass, propSatisfies, is, and, not, andThen, pipe } from "ramda";
import { DateTime } from "luxon";
import Cookie from "universal-cookie";

export interface IConfig {}
export interface IMdsConfig {}
export interface ICookie {}
export interface ICoreOptions {}

class MdsConfig {
  constructor(config: IConfig) {}
}

class MdsCore {
  config: MdsConfig;

  constructor(config: IConfig, cookie: ICookie, options: ICoreOptions) {
    this.config = new MdsConfig(config);
  }
}

export { MdsCore };
