import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledCartComponent } from './cart.styles';
import { ProductCartComponent } from './product-cart';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';

const CartComponent = ({ products }) => {

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
        <StyledCartComponent>
            <div>
                <p>Passos</p>
            </div>
            <div className="cart-container">
                <div className="cart-title-container">
                    <h2>
                        Seu<br />
                        <span><b>Carrinho</b></span>
                    </h2>
                    <button type="button">Adicionar mais produtos</button>
                </div>
                <div className="cart-products-container">
                    {products.map((product, index) => (
                        <ProductCartComponent key={index} {...product} />
                    ))}
                </div>
                <div className="cart-total-value-container">
                    <p>TOTAL: <strong>{numberToReal(totalValue)}</strong></p>
                </div>
            </div>
        </StyledCartComponent>
    )
}

const mapStateToProps = state => ({
    products: state.cardState.products,
})

export default connect(mapStateToProps)(CartComponent);
