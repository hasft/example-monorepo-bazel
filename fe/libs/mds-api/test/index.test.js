import MdsApi from "../index.js";
import { config } from "./constants";

describe("get services", () => {
  describe("constructor", () => {
    test("handle error constructor", () => {
      expect(new MdsApi()).toBeInstanceOf(MdsApi);
    });
  });

  describe("parse", () => {
    describe("get services", () => {
      test("handle falsy bulkinit on cookie bulk", () => {
        const mdsAPi = new MdsApi(config, {});
        expect(mdsAPi.getServices()).toBeNull();
      });

      test("decode bulkinit on cookie", () => {
        const mdsAPi = new MdsApi(config, { bulk_init: "N4IgzgpgTgbglgYwmEAuUBDNAmAvroA=" });
        expect(mdsAPi.getServices()).toMatchObject({ bulk_init: { services: { a: 2 } } });
      });
    });

    describe("fetchInit", () => {
      //TODO: mock
      const mdsAPi = new MdsApi(config, {});
      test("fetch init", async () => {
        expect(await mdsAPi.fetchInit()).toHaveProperty("ok");
        expect(await mdsAPi.fetchInit()).toHaveProperty("problem");
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
        const mdsAPi = new MdsApi(config, {});
        const bulky = await mdsAPi.getBulk();
        expect(bulky.data).toHaveProperty("service_url");
      });
    });
  });
});
