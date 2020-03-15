import { MdsCore } from "../index.js";

describe("session", () => {
  test("handle all empty", () => {
    const mds = new MdsCore({}, {}, {});
    expect(typeof mds.handleSession() === "string").toBeTruthy();
  });
  test("handle no exp but had uniqueid", () => {
    const mds = new MdsCore({}, { uniqueid: "abcd" }, {});
    expect(typeof mds.handleSession() === "string").toBeTruthy();
  });
  test("handle expired exp && has uniqueid ", () => {
    const mds = new MdsCore({}, { uniqueid: "abcd", "user.exp": "2020-03-15%2012:29:54" }, {});
    expect(typeof mds.handleSession() === "string" && mds.handleSession() !== "abcd").toBeTruthy();
  });
  test("handle persist exp && has uniqueid ", () => {
    const mds = new MdsCore({}, { uniqueid: "abcd", "user.exp": "2020-09-15%2012:29:54" }, {});
    expect(typeof mds.handleSession() === "string" && mds.handleSession() !== "abcd").toBeFalsy();
    expect(mds.handleSession()).toBe("abcd");
  });
});
