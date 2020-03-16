import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledResponsiveProductCart } from './responsive-product-cart.styles';
import { onlyNumberStringToFloatNumber, numberToReal } from '../../../helpers/calc.helpers';

const ResponsiveProductCartComponent = ({ name, quantity, id, dispatch, imgUrl, actualValueCents, quantitySuffix, className }) => {

    const totalProductValue = useMemo(
        () => {
            const unityPrice = onlyNumberStringToFloatNumber(actualValueCents);
            return unityPrice * quantity;
        }, [actualValueCents, quantity]
    )

    return (
        <StyledResponsiveProductCart className={className}>
            <div className="image-container">
                <img src={imgUrl} alt="Imagem do produto" />
            </div>
            <div className="info-container">
                <p>{name}</p>
                <p className="quantity-text">{quantity} {quantitySuffix}</p>
            </div>
            <div className="value-container">
                <p className="value-text">Valor</p>
                <p>{numberToReal(totalProductValue)}</p>
            </div>
        </StyledResponsiveProductCart>
    )

}

export default connect()(ResponsiveProductCartComponent);
