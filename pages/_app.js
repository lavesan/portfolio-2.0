import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
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

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <div className={globalStyle.Layout}>
          <HeaderComponent />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    )
  }
}