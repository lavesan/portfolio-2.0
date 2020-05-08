import React from 'react';
import { connect } from 'react-redux';
import Head from "next/head";

import GlobalStyle from './global-styles';
import { HeaderLayout } from '../layouts/header';
import { IApp } from './app.interfaces';

const App = ({ Component, pageProps }: IApp) => {

  // useEffect(() => {
  //   dispatch(screenResize({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   }));
  //   window.addEventListener('resize', () => {
  //       dispatch(screenResize({
  //           width: window.innerWidth,
  //           height: window.innerHeight,
  //       }));
  //   });
  // }, []);

  return (
      <div style={{
        minHeight: '100vh',
      }}>
          <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            {/* <link rel="icon" href={zeroVenenoLogo} /> */}
            <meta
              name="description"
              content="Faço seu site do começo ao fim, utilizando tecnologias atuais e com ótimo suporte."
            />
            <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&display=swap" rel="stylesheet"></link>
            <meta name="keywords" content="portfolio,desenvolvedor,developer,javascript,react,nodejs,node,sites,freelancer,fullstack,frontend,backend" />
            <meta name="author" content="Valdery Alves Paes Júnior <valdery.jur@gmail.com> (http://valderyalves.com)" />
            <title>Valdery - desenvolvedor de sites</title>
          </Head>
          <HeaderLayout>
            <Component {...pageProps} />
          </HeaderLayout>
      </div>
  )

}

export const AppComponent = connect()(App);
