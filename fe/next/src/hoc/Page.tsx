import * as React from "react";
import Composed from 'mm/fe/next/src/hoc/Composed';
import {Provider as AuthProvider} from 'mm/fe/next/src/contexts/auth';
import { NextPage } from "next";
import { parseCookies } from "nookies";

export default (PageComponent: NextPage) => {
    return class Page extends React.Component {
        public static async getInitialProps(initialProps: any) {
            // before any contexts mounted
            let pageProps = {};
            const {ctx} = initialProps;
            const cookies = parseCookies(ctx);

            console.log(cookies, "COOKIES", ctx);

            const getInitialProps = PageComponent.getInitialProps;

//            const status = new MmAuth({isAnonymous: false, isDesktop: false});
            
            if (getInitialProps) {
                pageProps = await PageComponent.getInitialProps(initialProps)
            }

            return {pageProps};
        }

        public render() {
            return (
                <Composed components={[AuthProvider]}>
                    <PageComponent/>
                </Composed>
            );
        }
    }
}
