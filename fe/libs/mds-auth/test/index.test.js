import isEmpty from "lodash.isempty";
import MdsApiAuth from "../index.js";
import { config } from "./constants";

beforeEach(() => {
  MdsApiAuth.prototype.loginAsGuest = jest.fn().mockReturnValue({
    ok: true,
    problem: null,
    data: {
      data: { token: "some token" },
    },
  });
});

describe("parse", () => {
  describe("userStatus", () => {
    test("getUserstatus guest", () => {
      const mdsAuth = new MdsApiAuth(config, {
        "user.mds.exp": "undefined",
        isLogin: "false",
      });
      expect(mdsAuth.getUserStatus()).toBe("guest");
    });
    test("getUserstatus withThor or valid for ovo action", () => {
      const mdsAuth = new MdsApiAuth(config, {
        "user.mds.exp": "lalalala",
        isLogin: "true",
      });
      expect(mdsAuth.getUserStatus()).toBe("with_thor");
    });

    test("getUserstatus unknown", () => {
      const mdsAuth = new MdsApiAuth(config, {});
      expect(mdsAuth.getUserStatus()).toBe("unknown");
    });
  });

  describe("anonymous", () => {
    // MdsApiAuth.prototype.getUser = jest.fn().mockImplementationOnce(cookie => {
    //   const mock = new MdsApiAuth(config, cookie);

    //   console.log("object", "lalala");

    //   if (isEmpty(cookie)) {
    //     const guest = mock.loginAsGuest();
    //     return guest.data.data;
    //   } else {
    //     return null;
    //   }
    // });

    // test("should loginAsguest if no uidcookie", async () => {
    //   const cookie = {};
    //   const mdsAuth = new MdsApiAuth(config, cookie);
    //   const user = await mdsAuth.getUser(cookie);
    //   expect(user).toHaveProperty("token");
    //   expect(mdsAuth.loginAsGuest).toHaveBeenCalledTimes(1);
    // });

    test("handle had cookie", async () => {
      const cookie = { "user.uid": "abcd", "user.exp": "expired" };
      const mdsAuth = new MdsApiAuth(config, cookie);
      const user = await mdsAuth.getUser();
      expect(user).toMatchObject({ "user.uid": "abcd", "user.exp": "expired" });
    });

    // test("should return a mirrror of anonymouslogin data structure if has uid", async () => {
    //   const cookie = { uid: "aaa" };
    //   MdsApiAuth.prototype.getUser = jest.fn().mockImplementation(() => {
    //     const mock = new MdsApiAuth(config, cookie);

    //     if (isEmpty(cookie)) {
    //       return null;
    //     } else {
    //       return this.takeUserCookie();
    //     }
    //   });
    //   const mdsAuth = new MdsApiAuth(config, cookie);
    //   const user = await mdsAuth.getUser();
    //   expect(user).toHaveProperty("token");
    // });
  });
});
