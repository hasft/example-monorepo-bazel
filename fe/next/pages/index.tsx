import * as React from "react";
import { NextPage, NextPageContext } from "next";

interface HomeProps {
  user: {};
}

const Home: NextPage<HomeProps> = props => {
  return (
    <div>
      <div>home</div>
    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext & HomeProps) => {
  return { user: ctx.user };
};

export default Home;
