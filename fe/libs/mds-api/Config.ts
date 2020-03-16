import { IConfig } from "mds/fe/libs/mds-types";

export default function(conf: IConfig) {
  let config = conf;

  const core = {
    getConfig(target: "server" | "client") {
      return config;
    },

    setSessionToConfig(session) {
      config.headers = {
        ...config.headers,
        session_id: session,
      };
    },
  };

  return core;
}
