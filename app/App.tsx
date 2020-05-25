import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Head from "next/head";

import GlobalStyle from './global-styles';
import { HeaderLayout } from '../layouts/header';
import { IApp } from './app.interfaces';
import { IReduxStates } from '../store/types';
import { setScreenSize } from '../store/actions/uiActions';

const mapStateToProps = (store: IReduxStates) => ({
  smoothScroll: store.uiState.smoothScroll,
});

const connector = connect(mapStateToProps);

const App = ({ Component, pageProps, smoothScroll }: IApp & ConnectedProps<typeof connector>) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScreenSize({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    }));
    window.addEventListener('resize', () => {
        dispatch(setScreenSize({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        }));
    });
  }, []);

  return (
      <div style={{
        minHeight: '100vh',
      }}>
          <GlobalStyle smoothScroll={smoothScroll} />
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

export const AppComponent = connector(App);
