import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";

import { StyledCartComponent } from './cart.styles';
import { ProductCartComponent } from './product-cart';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';

const CartComponent = ({ products, className }) => {

    const router = useRouter();

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

    const navigateToProducts = () => {
        router.push('/inicio');
    }

    return (
        <StyledCartComponent className={className}>
            <div className="cart-title-container">
                <h2>
                    Seu<br />
                    <span><b>Carrinho</b></span>
                </h2>
                <button type="button" onClick={navigateToProducts}>Adicionar mais produtos</button>
            </div>
            <div className="cart-products-container">
                {products.map((product, index) => (
                    <ProductCartComponent key={index} {...product} />
                ))}
            </div>
            <div className="cart-total-value-container">
                <p>TOTAL: <strong>{numberToReal(totalValue)}</strong></p>
            </div>
        </StyledCartComponent>
    )
}

const mapStateToProps = store => ({
    products: store.cartState.products,
});

export default connect(mapStateToProps)(CartComponent);
