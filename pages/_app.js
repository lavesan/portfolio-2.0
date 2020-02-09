import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import styled from 'styled-components';

import { makeStore } from "../store";
import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import GlobalStyle from './global-styles';

const theme = {
  green: {
    primary: '#3ECD25',
    secondary: '#008B47',
    terciary: '#005240',
    quaternary: '#012D23',
  },
  gray: {
    primary: '#C4C4C4',
    secondary: '#4E4D4D',
  },
  blue: {
    primary: '#0d1589',
    secondary: '#058ced',
  },
  fonts: {
    bobbyJones: 'Bobby Jones Soft',
    roboto: 'Roboto',
  }
}

const StyledPage = styled.div`
  padding: 20px 60px;
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className={globalStyle.Layout}>
            <GlobalStyle />
            <Head>
              <title>Zero veneno</title>
            </Head>
            <HeaderComponent />
            <StyledPage>
              <Component {...pageProps} />
            </StyledPage>
            <FooterComponent />
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);