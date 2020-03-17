import { ICoreError } from "mds/fe/libs/mds-types";

export default function(msg: string): ICoreError {
  const core = {
    msg: msg,
  };

  return core;
}
