import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Router } from 'next/router';
import Head from "next/head";

import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import GlobalStyle from './global-styles';
import { setShowHeaderAndFooter } from '../store/actions/routesActions';
import { PromotionService } from '../services/promotion.service';
import { ComboService } from '../services/combo.service';
import { setPromotions, setCombos } from '../store/actions/productActions';

const StyledPage = styled.div`
  padding: 20px 60px;

  @media(max-width: 700px) {
    padding: 20px 20px;
  }
`;

const App = ({ Component, pageProps, dispatch, showFooter, showHeader, applyPageStyle }) => {

  const promotionService = new PromotionService();
  const comboService = new ComboService();

  const handleInit = useCallback(
    () => {
      if (window && window.history && window.history.state && window.history.state.url && /.*entrar.*/.test(window.history.state.url)) {
        dispatch(setShowHeaderAndFooter({
            showHeader: false,
            showFooter: false,
        }))
      }
      Router.events.on('routeChangeComplete', (url) => {
        if (/.*entrar.*/.test(url)) {
              dispatch(setShowHeaderAndFooter({
                  showHeader: false,
                  showFooter: false,
                  applyPageStyle: false,
              }))
          } else {
              dispatch(setShowHeaderAndFooter({
                  showHeader: true,
                  showFooter: true,
                  applyPageStyle: true,
              }))
          }
      })

      promotionService.findAllFromUser()
        .then(res => {
          dispatch(setPromotions(res));
        })
      comboService.findAll()
        .then(res => {
          dispatch(setCombos(res));
        })
    },
    [Router]
  )

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  return (
      <div className={globalStyle.Layout}>
          <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <title>Zero veneno</title>
          </Head>
          {showHeader && <HeaderComponent />}
          {applyPageStyle
            ?
            <StyledPage>
              <Component {...pageProps} />
            </StyledPage>
            : <Component {...pageProps} />
          }
          {showFooter && <FooterComponent />}
      </div>
  )

}

const mapStateToProps = store => ({
    showHeader: store.routesState.showHeader,
    showFooter: store.routesState.showFooter,
    applyPageStyle: store.routesState.applyPageStyle,
});

export const AppComponent = connect(mapStateToProps)(App);
