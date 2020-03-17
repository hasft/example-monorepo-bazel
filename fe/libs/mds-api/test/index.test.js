import mdsCore from "../index.js";

describe("session", () => {
  test("create session ok even if empty", () => {
    const mds = mdsCore({}, {}, {});
    expect(mds.createSession()).toBeTruthy();
  });
  test("create session if find uniqueid and not expired", () => {
    const mds = mdsCore({}, { uniqueid: "some", "user.exp": "2020-03-17%2011:08:40" }, {});
    expect(mds.createSession()).toBe("some");
  });
  test("set session to config", () => {
    const mds = mdsCore({}, {}, {});
    mds.setSessionToConfig("as");
    expect(mds.getConfig()).toStrictEqual({ headers: { session_id: "as" } });
  });
  test("set session to cookie", () => {
    const mds = mdsCore({}, {}, {});
    mds.setSessionToCookie("as");
    expect(mds.getCookie()).toStrictEqual({ uniqueid: "as" });
  });
  test("set session to cookie and config", () => {
    const mds = mdsCore({}, {}, {});
    mds.setSessionToCookieAndConfig("as");
    expect(mds.getCookie()).toStrictEqual({ uniqueid: "as" });
    expect(mds.getConfig()).toStrictEqual({ headers: { session_id: "as" } });
  });
});

describe("instance", () => {
  test("getInstance", () => {
    const mds = mdsCore({}, {}, {});
    expect(mds.getInstance()).toHaveProperty("setBaseURL");
  });
  test("updateInstance", () => {
    const mds = mdsCore({ baseURL: "base", headers: { session_id: "asdsa" } }, {}, {});
    const api = mds.updateInstance(mds.getConfig());
    expect(mds.getInstance().headers).toHaveProperty("session_id");
  });
});

describe("fetchInit", () => {
  test("check is config ok", async () => {
    const mds = mdsCore({ baseURL: "base", headers: { session_id: "asdsa" } }, {}, {});
    const res = await mds.fetchInit();
    console.log("object", res);
  });
});
