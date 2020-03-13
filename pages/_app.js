import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import styled from 'styled-components';
import 'swiper/css/swiper.css'

import { makeStore } from "../store";
import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import GlobalStyle from './global-styles';
import axios from 'axios';
import environment from '../.env.json';
import { AddressModal } from '../components/modal/address-modal';
import { ProductModalComponent } from '../components/modal/product-modal';
import theme from './app.theme';
import { ResponsiveNavComponent } from '../components/responsive-nav';
import { ResponsiveCartComponent } from '../components/responsive-cart';

axios.defaults.baseURL = environment.API_URL;
axios.interceptors.request.use(req => {
    
  const token = localStorage.getItem('auth');

  if (token) {
      req.headers = {
         ...req.headers,
         authorization: token, 
      }
  }

  
  return req;

})
axios.interceptors.response.use(
  res => res.data ? Promise.resolve(res.data) : Promise.resolve(res),
  err => err ? (err.response ? Promise.reject(err.response.data) :  Promise.reject(err.response)) : err,
);

const StyledPage = styled.div`
  padding: 20px 60px;

  @media(max-width: 700px) {
    padding: 20px 20px;
  }
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
          <AddressModal />
          <ProductModalComponent />
          <ResponsiveNavComponent />
          <ResponsiveCartComponent />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);