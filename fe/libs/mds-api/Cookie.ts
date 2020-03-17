import Cookies from "universal-cookie";

export default function(ck) {
  const core = new Cookies(ck);

  return core;
}
