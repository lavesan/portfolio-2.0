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
import { setCategories } from '../store/actions/categoryActions';
import { setUserInfo, clearUserInfo } from '../store/actions/authActions';
import { screenResize } from '../store/actions/uiActions';
import { setPromotions, setCombos, setPromotionalProducts, setCategoryProducts } from '../store/actions/productActions';
import { categoryInstance } from '../services/category.service';
import { comboInstance } from '../services/combo.service';
import { promotionInstance } from '../services/promotion.service';
import { authInstance } from '../services/auth.service';
import { productInstance } from '../services/product.service';

const StyledPage = styled.div`
  padding: 20px 60px;

  @media(max-width: 700px) {
    padding: 20px 20px;
  }
`;

const App = ({ Component, pageProps, dispatch, showFooter, showHeader, applyPageStyle, screenWidth }) => {

  const categoryService = categoryInstance.getInstance();
  const comboService = comboInstance.getInstance();
  const promotionService = promotionInstance.getInstance();
  const authService = authInstance.getInstance();
  const productService = productInstance.getInstance();

  const initiateStates = useCallback(
    async () => {
      
      const userData = localStorage.getItem('userData');
      const token = localStorage.getItem('auth');

      if (userData) {

        dispatch(setUserInfo(JSON.parse(userData), token));

      }

      await authService.refreshToken()
        .then(res => {
          setTimeout(() => {
            dispatch(setUserInfo(JSON.parse(res.user), res.token))
          }, 500)
        })
        .catch(err => {
          dispatch(clearUserInfo());
          authService.logoff();
        });

      await categoryService.getAll()
        .then(res => {
          dispatch(setCategories(res))
        });
      await promotionService.findAllFromUser()
        .then(res => {
          dispatch(setPromotions(res));
        })
        .catch(() => {
          dispatch(setPromotions([]));
        })
      await comboService.findAll()
        .then(res => {
          dispatch(setCombos(res));
        })
        .catch(() => {
          dispatch(setCombos([]));
        })
      setTimeout(async () => {
        await callUntilGetResult(productService.findProductsPromotions)
            .then(res => {
              dispatch(setPromotionalProducts(res));
            })
            .catch(err => {
            });
        await callUntilGetResult(productService.findProductsFromCategories)
            .then(res => {
              dispatch(setCategoryProducts(res));
            })
            .catch(err => {
            });
      }, 500)

    },
    []
  )

  const callUntilGetResult = async (func, tries = 1) => {

    if (tries < 5) {
      return await func()
        .then(res => {
          return res;
        })
        .catch(err => {
          return callUntilGetResult(func, tries + 1);
        })
    } else {
      return Promise.reject({ message: 'Erro ao carregar os dados' });
    }

  }

  const handleInit = useCallback(
    () => {
      initiateStates();
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
    },
    [Router]
  )

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  useEffect(() => {
    dispatch(screenResize({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    window.addEventListener('resize', () => {
        dispatch(screenResize({
            width: window.innerWidth,
            height: window.innerHeight,
        }));
    });
  }, []);

  return (
      <div className={globalStyle.Layout} style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        minHeight: '100vh',
      }}>
          <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <title>Zero veneno</title>
          </Head>
          {showHeader ? <HeaderComponent /> : ''}
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
    screenWidth: store.uiState.screenWidth,
});

export const AppComponent = connect(mapStateToProps)(App);
