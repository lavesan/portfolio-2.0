import React from 'react';
import { connect } from 'react-redux';

import { StyledProductCard } from './product-card.styles';
import { StyledSuccessButton } from '../button';
import { toggleProductModal } from '../../store/actions/modalActions';
import { numberStringToReal } from '../../helpers/calc.helpers';

const ProductCardComponent = ({ dispatch, ...product }) => {

    const addToCart = () => {
        dispatch(toggleProductModal(product));
    };

    return (
        <StyledProductCard>
            <div className="product-image-container">
                <img src={product.imgUrl} alt={`image-do-produto-${product.name}`} />
            </div>
            <h3 className="product-name"><b>{product.name} 1{product.quantitySuffix}</b></h3>
            <p className="price-paragraph">
                <span className="price-text">Por:</span> 
                <span className="price-value">{numberStringToReal(product.actualValueCents)}</span>
            </p>
            <StyledSuccessButton
                className="submit-button"
                onClick={addToCart}>
                    Adicionar ao carrinho
            </StyledSuccessButton>
        </StyledProductCard>
    )
}

export default connect()(ProductCardComponent);
