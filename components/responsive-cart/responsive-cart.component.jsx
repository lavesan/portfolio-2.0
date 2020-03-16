import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyledResponsiveCard } from './responsive-cart.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { toggleResponsiveOpenresponsiveCart } from '../../store/actions/responsiveActions';
import { StyledIconNotification } from '../icon-notifications/icon-notifications.styles';
import { ResponsiveProductCart } from './responsive-product-cart';

const ResponsiveCartComponent = ({ dispatch, products, openResponsiveCart, screenHeight, screenWidth }) => {

    const toggleCart = () => {
        dispatch(toggleResponsiveOpenresponsiveCart());
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
            {screenWidth < 700 &&
                <>
                    <StyledResponsiveCard openResponsiveCart={openResponsiveCart && products.length} screenHeight={screenHeight || 2000} openCartHeader={products.length}>
                        <header className="cart-header" onClick={toggleCart}>
                            <div className="icon-container">
                                <StyledIconNotification className="notify">{products.length}</StyledIconNotification>
                                <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                            </div>
                            <p>Abrir carrinho</p>
                            <b>{numberToReal(totalValue)}</b>
                        </header>
                        <section className="cart-container">
                            <div className="cart-title-container">
                                <h2>Seu carrinho</h2>
                                <p>Excluir item</p>
                            </div>
                            {products.map(product =>
                                <ResponsiveProductCart
                                    key={product.id}
                                    className="responsive-cart"
                                    {...product} />)
                            }
                        </section>
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
})

export default connect(mapStateToProps)(ResponsiveCartComponent);
