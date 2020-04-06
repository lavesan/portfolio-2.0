import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledProductCard } from './product-card.styles';
import { StyledSuccessButton } from '../button';
import { toggleProductModal } from '../../store/actions/modalActions';
import { numberStringToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { percentageMask } from '../../helpers/mask.helpers';
import { productSuffixes } from '../../helpers/product.helper';

const ProductCardComponent = ({ dispatch, ...product }) => {

    const addToCart = () => {
        dispatch(toggleProductModal(product));
    };

    const promotionalPercentage = useMemo(
        () => {

            if (product.promotionalValueCents) {
                const promotional = onlyNumberStringToFloatNumber(product.promotionalValueCents);
                const normal = onlyNumberStringToFloatNumber(product.actualValueCents);

                const percentage = (normal - promotional) * 100 / normal;

                return Math.abs(percentage);

            }
            return 0;

        },
        [product.actualValueCents, product.promotionalValueCents]
    )

    const isDisabled = useMemo(
        () => {
            return product.quantityOnStock <= 0;
        },
        [product.quantityOnStock]
    )

    const productSuffix = useMemo(
        () => {
            return product.quantitySuffix === productSuffixes.UNITY ? productSuffixes.UNITY : productSuffixes.KILOGRAM;
        },
        [product.quantitySuffix]
    )

    return (
        <StyledProductCard isDisabled={isDisabled}>
            {isDisabled && <>
                <p className="disabled-paragraph"><b>Indisponível</b></p>
                <div className="court"></div>
            </>}
            <div className="product-container">
                {product.promotionalValueCents &&
                    <div className="promotional-tag">
                        <strong>{percentageMask(promotionalPercentage)}</strong>
                    </div>
                }
                <div className="product-image-container">
                    <img src={product.imgUrl} alt={`image-do-produto-${product.name}`} />
                </div>
                <h3 className="product-name"><b>{product.name} {productSuffix}</b></h3>
                <section className="price-section">
                    {product.promotionalValueCents
                        ? <>
                            <p className="price-promotion-paragraph">De: {numberStringToReal(product.promotionalValueCents)}</p>
                            <p className="price-paragraph">
                                <span className="price-text">Por:</span> 
                                <span className="price-value">{numberStringToReal(product.actualValueCents)}</span>
                            </p>
                        </>
                        : <p className="price-paragraph">
                            <span className="price-text">Preço:</span> 
                            <span className="price-value">{numberStringToReal(product.actualValueCents)}</span>
                        </p>
                    }
                </section>
                <StyledSuccessButton
                    className="submit-button"
                    onClick={addToCart}>
                        Adicionar ao carrinho
                </StyledSuccessButton>
            </div>
        </StyledProductCard>
    )
}

export default connect()(ProductCardComponent);
