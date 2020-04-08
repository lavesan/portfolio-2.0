import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Router } from 'next/router';
import Head from "next/head";
import axios from 'axios';
import moment from 'moment';

import globalStyle from './style.css'
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import GlobalStyle from './global-styles';
import { setShowHeaderAndFooter, setActualRoute, setShowHeaderInput } from '../store/actions/routesActions';
import { setCategories } from '../store/actions/categoryActions';
import { setUserInfo, clearUserInfo } from '../store/actions/authActions';
import { screenResize } from '../store/actions/uiActions';
import { setPromotions, setCombos, setPromotionalProducts, setCategoryProducts, toogleProductFilter } from '../store/actions/productActions';
import { toogleFullLoading } from '../store/actions/loadingActions';
import { setActiveOrders, setFreeTimes, setScheduleStepValues, setSelectedOrder, clearSelectedOrder, setOrdersData } from '../store/actions/orderActions';
import { categoryInstance } from '../services/category.service';
import { comboInstance } from '../services/combo.service';
import { authInstance } from '../services/auth.service';
import { productInstance } from '../services/product.service';
import { orderInstance } from '../services/order.service';
import { FullScreenLoading } from '../components/full-screen-loading';
import zeroVenenoLogo from '../public/static/imgs/zero-veneno-logo.jpeg';

const StyledPage = styled.div`
  padding: 20px 60px;

  @media(max-width: 700px) {
    padding: 20px 20px;
  }
`;

const App = ({ Component, pageProps, dispatch, showFooter, showHeader, applyPageStyle, screenWidth, actualRoute, token, activeOrders, selectedOrder }) => {

  const categoryService = categoryInstance.getInstance();
  const comboService = comboInstance.getInstance();
  // const promotionService = promotionInstance.getInstance();
  const authService = authInstance.getInstance();
  const productService = productInstance.getInstance();
  const orderService = orderInstance.getInstance();

  const [font, setFont] = useState('');

  const initiateStates = useCallback(
    async () => {

      // Init the values on the schedule step
      const today = moment().format('DD/MM/YYYY');
      dispatch(setScheduleStepValues({
        name: 'date',
        value: today,
      }))
      await orderService.getFreeTimesFromDate(today)
        .then(res => {
            dispatch(setFreeTimes(res ? res.activeTimes : []));
        })
        .catch(({ message }) => {
            dispatch(setFreeTimes([]));
        });

      // Gets the order storage for that client
      const ordersIdsStorage = localStorage.getItem('orders');

      if (ordersIdsStorage) {
        const orderIds = JSON.parse(ordersIdsStorage);
        if (orderIds) {
          dispatch(setActiveOrders(orderIds));
        }
      }

      // Refreshes the user data/token on site init
      const userData = localStorage.getItem('userData');
      const token = localStorage.getItem('auth');

      if (userData) {

        dispatch(setUserInfo(JSON.parse(userData), token));

      }

      if (token) {

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

      }

      // Gets the categories, products and promotions, to use on the ecommerce
      await categoryService.getAll()
        .then(res => {
          dispatch(setCategories(res))
        })
        .catch(err => {
          console.log('erro: ', err);
        });
      // await promotionService.findAllFromUser()
      //   .then(res => {
      //     console.log('vei...')
      //     dispatch(setPromotions(res));
      //   })
      //   .catch(() => {
      //     dispatch(setPromotions([]));
      //   })
      await callUntilGetResult(productService.findProductsPromotions)
          .then(res => {
            dispatch(setPromotions(res));
          })
          .catch(err => {
            dispatch(setPromotions([]));
          });
      await callUntilGetResult(productService.findProductsFromCategories)
          .then(res => {
            dispatch(setCategoryProducts(res));
          })
          .catch(err => {
          });
      // setTimeout(async () => {
      //     await callUntilGetResult(comboService.findAll)
      //         .then(res => {
      //           dispatch(setCombos(res));
      //         })
      //         .catch(err => {
      //           dispatch(setCombos([]));
      //         });
      // }, 500)

      reloadOrders();

      // Finish the loading icon page
      dispatch(toogleFullLoading(false));

    },
    []
  )
 
  const reloadOrders = () => {

    if (activeOrders && activeOrders.length) {
      
      orderService.findAllActiveByIds(activeOrders)
        .then(res => {
  
          const orderId = localStorage.getItem('selectedOrderId') || selectedOrder.id;
          if (orderId) {
  
            const selectedOderResponse = res.find(order => order.id === orderId)
            if (selectedOderResponse) {
              dispatch(setSelectedOrder(selectedOderResponse));
            } else {
              dispatch(clearSelectedOrder());
              localStorage.removeItem('selectedOrderId')
            }
  
          }
  
          dispatch(setOrdersData(res));
          const ordersId = res.map(order => order.id);
          localStorage.setItem('orders', JSON.stringify(ordersId));
  
        })
        .catch(({ message }) => {
          console.log(message);
        });

    }

    setTimeout(() => {
        reloadOrders();
    }, 120000);

  }

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
            applyPageStyle: false,
        }));
      }
      if (window && window.history && window.history.state && window.history.state.url) {
        dispatch(setActualRoute(window.history.state.url));
      }
      Router.events.on('routeChangeComplete', url => {

        dispatch(setActualRoute(url));
        dispatch(toogleProductFilter(false));

        if (/.*entrar.*/.test(url)) {
              dispatch(setShowHeaderAndFooter({
                  showHeader: false,
                  showFooter: false,
                  applyPageStyle: false,
              }))
              dispatch(setShowHeaderInput(true))
          } else if (/.*carrinho.*/.test(url)) {

          } else {
              dispatch(setShowHeaderAndFooter({
                  showHeader: true,
                  showFooter: true,
                  applyPageStyle: true,
              }))
              dispatch(setShowHeaderInput(true))
          }
      })
    },
    []
  )

  useEffect(() => {
    handleInit();

    axios.get('files/bobby-jones.ttf')
    .then(res => {
      setFont(res);
    })

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
          <GlobalStyle font={font} hideOverflowX={screenWidth < 750 || !(/.*carrinho.*/.test(actualRoute))} />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link rel="icon" href={zeroVenenoLogo} />
            <meta
              name="description"
              content="Delivery de hortaliças e frutas orgânicas certificadas, e oleaginosas e outros a granel não orgânicos"
            />
            <meta name="keywords" content="delivery,orgânico,recife,hortaliças,natural,saudável,vegetariano,vegano,frutas" />
            <meta name="author" content="Valdery Alves Paes Júnior <valdery.jur@gmail.com> (http://valderyalves.com)" />
            <title>Zero Veneno- Produtos Orgânicos</title>
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
          <FullScreenLoading />
      </div>
  )

}

const mapStateToProps = store => ({
    showHeader: store.routesState.showHeader,
    showFooter: store.routesState.showFooter,
    applyPageStyle: store.routesState.applyPageStyle,
    screenWidth: store.uiState.screenWidth,
    actualRoute: store.routesState.actualRoute,
    token: store.authState.token,
    selectedOrder: store.orderState.selectedOrder,
    activeOrders: store.orderState.activeOrders,
});

export const AppComponent = connect(mapStateToProps)(App);
