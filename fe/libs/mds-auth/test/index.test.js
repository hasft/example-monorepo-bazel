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
  describe("anonymous", () => {
    test("should loginAsguest if no uidcookie", async () => {
      const cookie = {};

      MdsApiAuth.prototype.getUser = jest.fn().mockImplementation(() => {
        const mock = new MdsApiAuth(config, cookie);

        if (isEmpty(cookie)) {
          const guest = mock.loginAsGuest();
          return guest.data.data;
        } else {
          return null;
        }
      });

      const mdsAuth = new MdsApiAuth(config, cookie);
      const user = await mdsAuth.getUser();
      expect(user).toHaveProperty("token");
      expect(mdsAuth.loginAsGuest).toHaveBeenCalledTimes(1);
    });

    test("should return a mirrror of anonymouslogin data structure if has uid", async () => {
      const cookie = { uid: "aaa" };
      MdsApiAuth.prototype.getUser = jest.fn().mockImplementation(() => {
        const mock = new MdsApiAuth(config, cookie);

        if (isEmpty(cookie)) {
          return null;
        } else {
          return { token: "some token" };
        }
      });
      const mdsAuth = new MdsApiAuth(config, cookie);
      const user = await mdsAuth.getUser();
      expect(user).toHaveProperty("token");
    });
  });
});
