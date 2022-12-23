import Head from 'next/head';
import Game from '../components/Game';

export default function Home() {
  return (
    <>
      <Head>
        <title>Igor Kuzmanović - Wordle</title>
        <meta name="theme-color" content="#fafafa" />
        <meta name="description" content="Wordle clone by Igor Kuzmanović" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Igor Kuzmanović" />
        <link
          rel="canonical"
          href="https://igor-kuzmanovic.github.io/wordle/"
        />
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
}
