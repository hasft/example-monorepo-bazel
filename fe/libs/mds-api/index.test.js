import MdsApi from "./index.js";

const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36";
const config = {
  baseURL: '',
  headers: {
    device_id: '',
    client_id: {
      desktop: 'cid',
      mobile: 'cim'
    },
    client_secret: {
      desktop: 'csd',
      mobile: 'csm'
    }
  }
};

describe('api', () => {
  test("build", () => {

  });
});
