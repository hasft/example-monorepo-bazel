import * as React from 'react';
import { AppProps } from 'next/app';
import Composed from 'mm/fe/next/src/hoc/Composed';
import {Provider as AuthProvider} from 'mm/fe/next/src/contexts/auth';
//
import { parseCookies } from "nookies";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import moment from "moment";
import MobileDetect from 'mobile-detect';

interface MyAppProps {}

function MyApp({ Component, pageProps }: AppProps & MyAppProps) {
    return <Composed components={[AuthProvider]}><Component {...pageProps} /></Composed>
}

type UserCookies = {
    isLogin: string,
    uniqueId: string,
    thirdPartyToken?: string | null | undefined,
    thirdPartyRefreshToken?: string,        
    thirdPartyExpiredAt?: string,
    anonymousToken?: string,
    anonymousRefreshToken?: string,
    anonymousExpiredAt?: string
}

type UserStatus = {
    isLogin: boolean,
    isAnonymous: boolean,
    isDesktopUser: boolean,
    isExpired: boolean
}

export interface MmUserInterface {
    data: UserCookies,
    status: UserStatus
}

export interface Service {
    
}

class MmAuth {
    userAgent: any;
    cookies: UserCookies;
    
    constructor(userAgent: string, cookies: any) {
        this.userAgent = userAgent;
        this.cookies = {
            isLogin: get(cookies, 'isLogin'),
            uniqueId: get(cookies, 'uniqueid'),
            thirdPartyToken: get(cookies, 'user.mds.token'),
            thirdPartyRefreshToken: get(cookies, 'user.mds.rf.token'),
            thirdPartyExpiredAt: get(cookies, 'user.mds.exp'),
            anonymousToken: get(cookies, 'user.token'),
            anonymousRefreshToken: get(cookies, 'user.rf.token'),
            anonymousExpiredAt: get(cookies, 'user.exp')            
        };
    }

    identifyUserStatus(): 'anonymous' | 'signed' {
        if(isEmpty(this.cookies.thirdPartyToken)) {
            return 'anonymous';
        } else {
            return 'signed';
        }
    }

    detectIsAnonymous(): boolean {
        return this.identifyUserStatus() === 'anonymous' ? true : false;
    }

    detectIsMobileDevice() {
        const md = new MobileDetect(this.userAgent);
        return !md.mobile();
    }

    detectIsExpired() {
        const isAnonymous = this.detectIsAnonymous();
        const expiredAt  = isAnonymous ? this.cookies.anonymousExpiredAt : this.cookies.thirdPartyExpiredAt;
        const now = moment();
        const momentExpired = moment(decodeURIComponent(expiredAt), 'YYYY-MM-DDTHH:mm:ss.SSSZ');

        return momentExpired.isBefore(now);
    }

    detectIsLogin() {
        return Boolean(this.cookies.isLogin) ? true : false;
    }

    parse(): MmUserInterface {
        const isExpired = this.detectIsExpired();
        const isLogin = this.detectIsLogin();
        const isAnonymous =  this.detectIsAnonymous();
        const isDesktop = this.detectIsMobileDevice();

        return {
            status: {
                isLogin,
                isAnonymous,
                isDesktopUser: isDesktop,
                isExpired
            },
            data: this.cookies
        }
    }
}


MyApp.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {};    
    const cookies = parseCookies(ctx);
    const userAgent = ctx.req.headers['user-agent'];
    console.log(userAgent)
    

    const user = new MmAuth(userAgent, cookies);


    ctx.user = user.parse()

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
}

export default MyApp
