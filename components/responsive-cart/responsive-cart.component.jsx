import React, { useMemo } from 'react';
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

const ResponsiveCartComponent = ({ dispatch, products, openResponsiveCart, screenHeight, screenWidth }) => {

    const router = useRouter();

    const toggleCart = () => {
        dispatch(toggleResponsiveOpenresponsiveCart());
    }

    const goToPayment = () => {
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
                    <StyledResponsiveCard openResponsiveCart={openResponsiveCart && products.length} screenHeight={screenHeight || 2000} openCartHeader={products.length}>
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
                                <p>EXCLUIR ITEMS</p>
                            </div>
                            <div className="products-container">
                                {products.map(product =>
                                    <ProductCartComponent key={product.id} hideRemove={true} {...product} />)
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
})

export default connect(mapStateToProps)(ResponsiveCartComponent);
