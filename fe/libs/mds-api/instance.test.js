import MdsApiInstance from "./instance.js";

const config = {
  baseURL: 'http://something',
  headers: {
    device_id: '',
    client_id: {
      desktop: 'cid desktop',
      mobile: 'cid mobile'
    },
    client_secret: {
      desktop: 'cs desktop',
      mobile: 'cs mobile'
    }
  }
};

describe("instance", () => {
  test("getinstanceconfig", () => {
    const mdsApiInstance = new MdsApiInstance({screen: 'desktop', config: config});
    expect(mdsApiInstance.create()).toBe(null);
  });
});
