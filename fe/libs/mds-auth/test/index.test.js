import get from "lodash.get";
import MdsApiError from "../../mds-error/index.js";
import isEmpty from "lodash.isempty";
import MdsApiAuth from "../index.js";
import { config } from "./constants";

const auth = (cookie = {}, cconfig = config) => new MdsApiAuth(cconfig, cookie);

describe("MDSAUTH", () => {
  test("generateSessionid on node", () => {
    expect(auth({}).generateSessionId).toBeTruthy();
  });

  describe("parseauthresponse", () => {
    test("handle no argument", () => {
      expect(auth({}).parseAuthResponse()).toStrictEqual({});
    });
    test("handle argument", () => {
      expect(
        auth({}).parseAuthResponse({
          token: "abc",
          expires_in: undefined,
          thor_token: null,
          thor_refresh_token: "rf token",
        }),
      ).toStrictEqual({
        token: "abc",
        thor_refresh_token: "rf token",
      });
    });
  });

  describe("getStatus", () => {
    test("unknown", () => {
      expect(auth({}).getStatus()).toBe("unknown");
      expect(auth({ uid: "a" }).getStatus()).not.toBe("unknown");
    });
    test("guest", () => {
      expect(auth({ uid: "a" }).getStatus()).toBe("guest");
      expect(auth({ uid: "a", "user.token": "bcd", "user.mds.token": "ll" }).getStatus()).toBe(
        "guest",
      );
    });
    test("with_thor", () => {
      expect(auth({ uid: "a", "user.mds.exp": "3200" }).getStatus()).toBe("with_thor");
    });
  });

  describe("isExpired", () => {
    test("unkonwn", () => {
      expect(auth({}).isExpired()).toBeTruthy();
    });
    test("guest expiration", () => {
      expect(auth({ uid: "uid", "user.exp": "2020-03-08%2015:36:26" }).isExpired()).toBe(true);
      expect(auth({ uid: "uid", "user.exp": "2020-03-08%2017:36:26" }).isExpired()).toBe(false);
    });
    test("with_thor expiration", () => {
      expect(auth({ uid: "uid", "user.mds.exp": "2020-03-08%2015:36:26" }).isExpired()).toBe(true);
      expect(auth({ uid: "uid", "user.mds.exp": "2020-03-08%2017:36:26" }).isExpired()).toBe(false);
    });
  });

  // describe("loginAsGuest", () => {
  //   test("handle no_config", () => {
  //     const guest = auth({}, {}).loginAsGuest();
  //     expect(guest).rejects.toHaveProperty("code", "constructor");
  //   });

  //   test("handle err", async () => {
  //     const guest = await auth({}, { ...config, accountBaseURL: "http://wrong.co" }).loginAsGuest();
  //     expect(guest.problem).toBe("CLIENT_ERROR");
  //   });

  //   test("handle ok", async () => {
  //     const guest = await auth({}).loginAsGuest();
  //     expect(guest).toHaveProperty("ok");
  //     expect(guest.ok).toBeTruthy();
  //   });
  // });

  // describe("getUser", () => {
  //   test("handle cookie with user.id", async () => {
  //     const guest = await auth({
  //       uid: "abcd",
  //       "user.token": "bcd",
  //       "user.mds.exp": undefined,
  //       "user.exp": "exp",
  //     }).getUser();

  //     expect(guest).toStrictEqual({
  //       token: "bcd",
  //       enc_userId: "abcd",
  //       expires_in: "exp",
  //     });
  //   });

  //   test("handle cookie without user.id and failed", async () => {
  //     const guest = await auth({}, { ...config, accountBaseURL: "http://wrong.co" }).getUser();
  //     expect(guest).toHaveProperty("code", "CLIENT_ERROR");
  //   });

  //   test("handle cookie without user.id and success", async () => {
  //     const guest = await auth({}).getUser();
  //     expect(guest).toHaveProperty("token");
  //   });
  // });

  // describe("parse", () => {
  //   test("parse status guest", () => {
  //     expect(auth({}).parse({}).status).toBe("unknown");
  //   });
  // });
});
