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

  MdsApiAuth.prototype.getUser = jest.fn().mockImplementation(() => {
    const mock = new MdsApiAuth();
    const guest = mock.loginAsGuest();
    return guest.data.data;
  });
});

describe("parse", () => {
  describe("anonymous", () => {
    test("should check user uid", async () => {
      const mdsAuth = new MdsApiAuth(config, {});
      const user = await mdsAuth.getUser();
      expect(user).toHaveProperty("token");
      expect(mdsAuth.loginAsGuest).toHaveBeenCalledTimes(1);
    });
  });
});
