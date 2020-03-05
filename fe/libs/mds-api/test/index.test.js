import MdsApi from "../index.js";
import { config } from "./constants";

beforeEach(() => {
  // mock async fetchInit
  MdsApi.prototype.fetchInit = jest.fn().mockImplementation(() => {
    return {
      ok: true,
      problem: null,
      data: {
        data: {
          segment: [
            {
              id: 195,
              key: "wanita",
              title: "WANITA",
            },
          ],
          service_url: {
            promo: { url: "https://services.mataharimall.co/promo/v1", host: "promo" },
          },
        },
      },
    };
  });
});

describe("get services", () => {
  describe("constructor", () => {
    test("handle error constructor", () => {
      expect(new MdsApi()).toBeInstanceOf(MdsApi);
    });
  });

  describe("parse", () => {
    describe("fetchInit", () => {
      //TODO: mock
      test("fetch init", async () => {
        const mdsApi = new MdsApi(config, {});
        expect(await mdsApi.fetchInit()).toHaveProperty("ok");
        expect(await mdsApi.fetchInit()).toHaveProperty("problem");
      });
    });

    describe("getBulk", () => {
      test("handle existed bulk", async () => {
        const mdsApi = new MdsApi(config, {
          bulk_init: "N4IgzgpgTgbglgYwgfQK5QDYgFygIY6gB2eAthDiAQDQgZxEDWl9TIAvp0A=",
        });
        const bulky = await mdsApi.getBulk();

        expect(bulky).toHaveProperty("service_url");
      });
      test("handle empty bulk", async () => {
        const mdsApi = new MdsApi(config, {});
        const bulky = await mdsApi.getBulk();
        expect(bulky).toHaveProperty("service_url");
      });
    });

    describe("getServices", () => {
      test("handle empty bulk", async () => {
        const mdsApi = new MdsApi(config, {});
        expect(await mdsApi.getServices()).toHaveProperty("promo");
      });
    });

    describe("getSegment", () => {
      test("handle empty bulk", async () => {
        const mdsApi = new MdsApi(config, {});
        expect(await mdsApi.getSegment()).toBeTruthy();
      });
    });

    describe("parse", () => {
      test("parse initial mdsApi", async () => {
        const mdsApi = new MdsApi(config, {});
        const parsed = await mdsApi.parse();
        expect(parsed.services).toHaveProperty("promo");
        expect(parsed.segment).not.toBeFalsy();
      });
    });

    // describe("getAuth", () => {
    //   test("should check isLogin and if false fetchAuth", async () => {
    //     const mdsApi = new MdsApi(config, {});
    //     const auth = await mdsApi.getAuth();
    //   });
    // });
  });
});
