import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import 'swiper/css/swiper.css';

import { makeStore } from "../store";
import { AppComponent } from '../app/App';
import { ProjectModal } from '../components/modal/project-modal';
import theme from '../app/app.theme';

class MyApp extends App {
  render() {
    const { store, Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppComponent
            Component={Component}
            pageProps={pageProps} />
          <ProjectModal />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp);