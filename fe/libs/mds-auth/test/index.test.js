import get from "lodash.get";
import MdsApiError from "../../mds-error/index.js";
import isEmpty from "lodash.isempty";
import MdsApiAuth from "../index.js";
import { config } from "./constants";

// beforeEach(() => {
//   MdsApiAuth.prototype.loginAsGuest = jest.fn().mockReturnValue({
//     ok: true,
//     problem: null,
//     data: {
//       data: { token: "some token" },
//     },
//   });
// });

// describe("getuser", () => {
//   const noCookie = {};
//   const withCookie = { uid: "uid", "user.token": "token" };
//   test("loginAsGuest", async () => {
//     const mdsAuth = new MdsApiAuth(config, noCookie);
//     expect(await mdsAuth.loginAsGuest()).toMatchObject({
//       ok: true,
//       problem: null,
//       data: {
//         data: { token: "some token" },
//       },
//     });
//   });

//   MdsApiAuth.prototype.mockGetUser = jest.fn().mockImplementationOnce(() => {
//     const mock = new MdsApiAuth(config, noCookie);
//     if (isEmpty(get(noCookie, "uid"))) {
//       const res = mock.loginAsGuest();
//       return res.data.data;
//     } else {
//       return {
//         token: cookie["user.token"],
//       };
//     }
//   });

//   MdsApiAuth.prototype.mockGetUserTwo = jest.fn().mockImplementationOnce(() => {
//     const mock = new MdsApiAuth(config, withCookie);
//     if (isEmpty(get(withCookie, "uid"))) {
//       const res = mock.loginAsGuest();
//       return res.data.data;
//     } else {
//       return {
//         token: withCookie["user.token"],
//         enc_userId: withCookie["uid"],
//       };
//     }
//   });
//   test("should loginAsguest if no uidcookie", async () => {
//     const mdsAuth = new MdsApiAuth(config, noCookie);
//     const user = await mdsAuth.mockGetUser();
//     expect(user).toHaveProperty("token");
//     expect(mdsAuth.loginAsGuest).toHaveBeenCalledTimes(1);
//   });

//   test("handle had cookie", async () => {
//     const mdsAuth = new MdsApiAuth(config, withCookie);
//     const user = await mdsAuth.mockGetUserTwo();
//     expect(user).toMatchObject({ enc_userId: "uid", token: "token" });
//   });
// });

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

  describe("loginAsGuest", () => {
    test("handle no_config", () => {
      const guest = auth({}, {}).loginAsGuest();
      expect(guest).rejects.toHaveProperty("code", "constructor");
    });
  });
});
