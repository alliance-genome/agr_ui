import React from 'react';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import './styles.css';
function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to mod-landing-pages!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <NxLogo width="75" height="50" />
          <h1>Welcome to mod-landing-pages!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
export default CustomApp;
