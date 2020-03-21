import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import 'swiper/css/swiper.css'

import { makeStore } from "../store";
import axios from 'axios';
import environment from '../public/static/env.json';
import { AddressModal } from '../components/modal/address-modal';
import { ProductModalComponent } from '../components/modal/product-modal';
import { TermOfContractModal } from '../components/modal/term-of-contract-modal';
import theme from '../app/app.theme';
import { ResponsiveNavComponent } from '../components/responsive-nav';
import { ResponsiveCartComponent } from '../components/responsive-cart';
import { AppComponent } from '../app/App';

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
  res => res && res.data ? Promise.resolve(res.data) : Promise.resolve(res),
  err => err ? (err.response ? Promise.reject(err.response.data) :  Promise.reject(err.response)) : err,
);

class MyApp extends App {
  render() {
    const { store, Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppComponent
            Component={Component}
            pageProps={pageProps} />
          <AddressModal />
          <ProductModalComponent />
          <ResponsiveNavComponent />
          <ResponsiveCartComponent />
          <TermOfContractModal />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);