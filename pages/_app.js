import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import styled from 'styled-components';
import Modal from "react-responsive-modal";

import { makeStore } from "../store";
import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import GlobalStyle from './global-styles';
import axios from 'axios';
import environment from '../.env.json';
import { AddressModal } from '../components/modal/address-modal';
import theme from './app.theme';

axios.defaults.baseURL = environment.API_URL;

const StyledPage = styled.div`
  padding: 20px 60px;
`;

class MyApp extends App {

  state = {
    show: false,
  }

  setShow = (show) => {
    this.setState({ show })
  }

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
            <button onClick={() => this.setShow(true)}>Vai abrir um modal, se liga</button>
            <FooterComponent />
          </div>
          <Modal
            open={this.state.show}
            onClose={() => this.setShow(false)}
            ariaHideApp={false}
            center>
              <AddressModal onCloseModal={() => this.setShow(false)} />
          </Modal>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);