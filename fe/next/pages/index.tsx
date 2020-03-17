import * as React from "react";
import { NextPage, NextPageContext } from "next";
import Nav from "mds/fe/next/src/components/nav";

interface HomeProps {
  user: {};
}

const Home: NextPage<HomeProps> = props => {
  return (
    <div>
      <Nav />
    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext & HomeProps) => {
  return { user: ctx.user };
};

export default Home;
