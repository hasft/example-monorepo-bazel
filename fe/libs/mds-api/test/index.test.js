import mdsCore from "../index.js";

describe("session", () => {
  test("create session ok even if empty", () => {
    const mds = mdsCore({}, {}, {});
    expect(typeof mds.createSession() === "string").toBeTruthy();
  });
  test("create session if find uniqueid", () => {
    const mds = mdsCore({}, { uniqueid: "some", "user.exp": "2020-03-17%2011:08:40" }, {});
    expect(mds.createSession()).toBe("some");
  });
});

describe("instance", () => {
  test("create session if config empty", () => {
    const mds = mdsCore({}, {}, {});
    expect(mds.createInstance()).toHaveProperty("msg");
  });
  test("create session if config ok", () => {
    const mds = mdsCore({ baseURL: "some", headers: { client_id: "", client_secret: "" } }, {}, {});
    expect(mds.createInstance()).toHaveProperty("setBaseURL");
  });
});
