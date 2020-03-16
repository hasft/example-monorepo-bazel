import mdsCore from "../index.js";
describe("functional way", () => {
  test("create session ok even if empty", () => {
    const mds = mdsCore({}, {}, {});
    expect(typeof mds.createSession() === "string").toBeTruthy();
  });
  test("create session if find uniqueid", () => {
    const mds = mdsCore({}, { uniqueid: "some", "user.exp": "2020-03-17%2011:08:40" }, {});
    expect(mds.createSession()).toBe("some");
  });
});
