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
        device_id: process.env.DEVICE_ID,
        client_id: {
          desktop: process.env.CLIENT_ID_DESKTOP,
          mobile: process.env.CLIENT_ID_MOBILE,
        },
        client_secret: {
          desktop: process.env.CLIENT_SECRET_DESKTOP,
          mobile: process.env.CLIENT_SECRET_MOBILE,
        },
      },
      ua: ctx.req.headers["user-agent"],
      initBaseURL: process.env.INIT_BASE_URL,
      bulkName: "bulk_init",
    },
    ctx.req.headers.cookie,
  );

  const parsed = await mdsApi.parse();
  console.log(parsed);

  ctx.user = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
