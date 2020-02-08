import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import Head from "next/head";

import { makeStore } from "../store";
import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';

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
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);