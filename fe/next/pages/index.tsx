import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import {MmUserInterface} from 'mm/fe/next/pages/_app';

interface HomeProps {
    user: MmUserInterface
}

const Home: NextPage<HomeProps> = (props) => {
    console.log(props)
    return (
        <div>        
            <div>home</div>
        </div>
    )
}

Home.getInitialProps = async (ctx: NextPageContext & HomeProps) => {
    return {user: ctx.user}
}


export default Home;
