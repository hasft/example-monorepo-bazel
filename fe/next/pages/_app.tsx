import * as React from "react";
import { AppProps } from "next/app";
import Composed from "mds/fe/next/src/hoc/Composed";
import { Provider as AuthProvider } from "mds/fe/next/src/contexts/auth";
import MdsApi from "mds/fe/libs/mds-api";

interface MyAppProps {}

function MyApp({ Component, pageProps }: AppProps & MyAppProps) {
  return (
    <Composed components={[AuthProvider]}>
      <Component {...pageProps} />
    </Composed>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  const mdsApi = new MdsApi(
    {
      baseURL: process.env.BASE_URL,
      headers: {
        Authorization: null,
        device_id: process.env.deviceId,
        client_id: {
          desktop: process.env.clientIdDesktop,
          mobile: process.env.clientIdMobile,
        },
        client_secret: {
          desktop: process.env.clientSecretDesktop,
          mobile: process.env.clientSecretMobile,
        },
      },
      ua: ctx.req.headers["user-agent"],
      initBaseURL: process.env.initBaseURL,
      bulkName: "bulk_init",
    },
    ctx.req.headers.cookie,
  );

  console.log(mdsApi.parse());

  ctx.user = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
