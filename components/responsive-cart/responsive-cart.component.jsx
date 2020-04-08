import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";

import { StyledResponsiveCard } from './responsive-cart.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { toggleResponsiveOpenresponsiveCart } from '../../store/actions/responsiveActions';
import { StyledIconNotification } from '../icon-notifications/icon-notifications.styles';
import { ResponsiveProductCart } from './responsive-product-cart';
import { ProductCartComponent } from '../cart/product-cart';
import { SucessButtonComponent } from '../button';
import { setResponsiveStep } from '../../store/actions/orderActions';

const ResponsiveCartComponent = ({ dispatch, products, openResponsiveCart, screenHeight, screenWidth, actualRoute }) => {

    const router = useRouter();

    const [removeItems, setRemoveItems] = useState(false);

    const productsAction = () => {
        setRemoveItems(f => !f);
    }

    const toggleCart = () => {
        dispatch(toggleResponsiveOpenresponsiveCart());
    }

    const goToPayment = () => {
        dispatch(setResponsiveStep(1));
        router.push('/carrinho');
    }

    const totalValue = useMemo(
        () => {

            let sumOfPrices = 0;

            products.forEach(({ quantity, actualValueCents }) => {
                const price = onlyNumberStringToFloatNumber(actualValueCents);
                sumOfPrices += price * quantity;
            })

            return sumOfPrices;

        },
        [products]
    )

    return (
        <>
            {screenWidth < 750 &&
                <>
                    <StyledResponsiveCard openResponsiveCart={openResponsiveCart && products.length && !(/.*(?:carrinho|entrar).*/.test(actualRoute))} screenHeight={screenHeight || 2000} openCartHeader={products.length && !(/.*carrinho.*/.test(actualRoute))}>
                        <header className="cart-header" onClick={toggleCart}>
                            <div className="icon-container">
                                <StyledIconNotification className="notify">{products.length}</StyledIconNotification>
                                <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                            </div>
                            <p>{openResponsiveCart ? 'Fechar' : 'Abrir'} carrinho</p>
                            <b>{numberToReal(totalValue)}</b>
                        </header>
                        <section className="cart-container">
                            <div className="cart-title-container">
                            {removeItems
                                ? <p onClick={productsAction}><b>CANCELAR AÇÃO</b></p>
                                : <p onClick={productsAction} className="danger-text"><b>EXCLUIR ITEMS</b></p>
                            }
                            </div>
                            <div className="products-container">
                                {products.map(product =>
                                    <ProductCartComponent key={product.id} isResponsive={true} hideRemove={!removeItems} {...product} />)
                                }
                            </div>
                        </section>
                        <div className="complete-container">
                            <p className="total-text">TOTAL: <b>{numberToReal(totalValue)}</b></p>
                            <SucessButtonComponent
                                type="button"
                                notDents={'true'}
                                onClick={goToPayment}
                                text="Escolher forma de pagamento"
                                className="success-button" />
                        </div>
                    </StyledResponsiveCard>
                </>
            }
        </>
    )

}

const mapStateToProps = store => ({
    products: store.cartState.products,
    openResponsiveCart: store.responsiveState.openResponsiveCart,
    screenHeight: store.uiState.screenHeight,
    screenWidth: store.uiState.screenWidth,
    actualRoute: store.routesState.actualRoute,
})

export default connect(mapStateToProps)(ResponsiveCartComponent);
