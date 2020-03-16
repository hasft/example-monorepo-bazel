import * as React from "react";
import { AppProps } from "next/app";
import Composed from "mds/fe/next/src/hoc/Composed";
import { Provider as AuthProvider } from "mds/fe/next/src/contexts/auth";
import MdsCore from "mds/fe/libs/mds-api";

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

  const config = {
    baseURL: process.env.BASE_URL,
    headers: {
      client_id: "",
      client_secret: "",
      client_version: "",
      device_id: process.env.DEVICE_ID,
    },
  };

  const mds = MdsCore(config, ctx.req.headers.cookie, {});
  const session = mds.createSession();
  console.log(session);

  ctx.user = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
