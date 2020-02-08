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

const theme = {
  green: {
    primary: '#1a5914',
    secondary: '#22962a',
  },
  blue: {
    primary: '#0d1589',
    secondary: '#058ced',
  },
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