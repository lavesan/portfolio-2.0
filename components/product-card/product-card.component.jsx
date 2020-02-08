import React from 'react';
import { StyledProductCard } from './product-card.styles';
import { StyledSuccessButton } from '../button';

export default ({ imgUrl, name, price, isPromotion, id }) => {

    const addToCard = () => {

    };

    return (
        <StyledProductCard>
            <div className="product-image-container">
                <img src={imgUrl} alt={`image-do-produto-${name}`} />
            </div>
            <h3 className="product-name"><b>{name}</b></h3>
            <p className="price-paragraph">
                <span className="price-text">Preço:</span> 
                <span className="price-value">{price}</span>
            </p>
            <StyledSuccessButton
                className="submit-button"
                onClick={addToCard}>
                    Adicionar ao carrinho
            </StyledSuccessButton>
        </StyledProductCard>
    )
}
