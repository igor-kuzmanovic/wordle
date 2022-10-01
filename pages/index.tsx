import type { NextPage } from "next";
import Head from "next/head";
import Game from "../components/Game";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Igor Kuzmanović - Wordle</title>
        <meta name="theme-color" content="#fafafa" />
        <meta name="description" content="Wordle clone by Igor Kuzmanović" />
        <meta name="author" content="Igor Kuzmanović" />
        <link rel="canonical" href="https://wordle.igorkuzmanovic.com/" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Game />
    </>
  );
};

export default Home;
