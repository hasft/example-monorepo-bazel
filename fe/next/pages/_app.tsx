import * as React from 'react';
import { AppProps } from 'next/app';
import Composed from 'mm/fe/next/src/hoc/Composed';
import {Provider as AuthProvider} from 'mm/fe/next/src/contexts/auth';
import ts from "mm/lang/ts";

interface MyAppProps {}

function MyApp({ Component, pageProps }: AppProps & MyAppProps) {
    return <Composed components={[AuthProvider]}><Component {...pageProps} /></Composed>
}


MyApp.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {};

    ctx.user = {a: ts()}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
}

export default MyApp
