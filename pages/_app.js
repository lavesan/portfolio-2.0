import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import { ToastProvider } from "react-toast-notifications";
import 'swiper/css/swiper.css';
import "react-calendar/dist/Calendar.css";

import { makeStore } from "../store";
import axios from 'axios';
import environment from '../public/static/env.json';
import { AddressModal } from '../components/modal/address-modal';
import { ProductModalComponent } from '../components/modal/product-modal';
import { TermOfContractModal } from '../components/modal/term-of-contract-modal';
import { FinishedOrderModal } from '../components/modal/finished-order-modal';
import { OrderModalComponent } from '../components/modal/order-modal';
import { AddOrderCommentModal } from '../components/modal/add-order-comment';
import theme from '../app/app.theme';
import { ResponsiveNavComponent } from '../components/responsive-nav';
import { ResponsiveCartComponent } from '../components/responsive-cart';
import { AppComponent } from '../app/App';

axios.defaults.baseURL = environment.API_URL;
axios.interceptors.request.use(req => {
    
  const token = localStorage.getItem('auth');

  if (token) {
    // console.log('entrando aqui: ', token);
    req.headers = {
        ...req.headers,
        authorization: token, 
    }
  }

  
  return req;

})
axios.interceptors.response.use(
  res => new Promise((resolve, reject) => {
    return res && res.data ? resolve(res.data) : resolve(res);
  }),
  err => {

    let error = err ? (err.response ? err.response.data : err.response) : { message: 'Aconteceu um problema interno. Por favor tente mais tarde' };
    error = error ? error : { message: 'Aconteceu um problema interno. Por favor tente mais tarde' };
    return Promise.reject(error);

  })

class MyApp extends App {
  render() {
    const { store, Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <AppComponent
              Component={Component}
              pageProps={pageProps} />
            <AddressModal />
            <ProductModalComponent />
            <ResponsiveNavComponent />
            <ResponsiveCartComponent />
            <TermOfContractModal />
            <AddOrderCommentModal />
            <OrderModalComponent />
            <FinishedOrderModal />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);