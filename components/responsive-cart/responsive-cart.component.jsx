import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledResponsiveCard } from './responsive-cart.styles';
import { CartComponent } from '../cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { toggleResponsiveOpenresponsiveCart } from '../../store/actions/responsiveActions';
import { StyledIconNotification } from '../icon-notifications/icon-notifications.styles';

const ResponsiveCartComponent = ({ dispatch, products, openResponsiveCart, screenHeight, screenWidth }) => {

    const openCart = () => {
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
                        <div className="cart-header" onClick={openCart}>
                            <div className="icon-container">
                                <StyledIconNotification className="notify">{products.length}</StyledIconNotification>
                                <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                            </div>
                            <b>{numberToReal(totalValue)}</b>
                        </div>
                        <div className="cart-container">
                            <CartComponent />
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
})

export default connect(mapStateToProps)(ResponsiveCartComponent);
