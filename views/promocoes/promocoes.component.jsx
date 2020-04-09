import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledPromocoesPage } from './promocoes.styles';
import { ProductCardComponent } from '../../components/product-card';
import { onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { productInstance } from '../../services/product.service';

const PromocoesPage = ({ promotions, promotionalProducts, selectedPromotion, dispatch }) => {

    const mapperedProducts = useMemo(
        () => {

            console.log('promotions: ', promotions);
            console.log('selectedPromotion: ', selectedPromotion);

            if (selectedPromotion.products && selectedPromotion.products.length) {

                const arr = [];

                promotions.forEach(promo => {

                    selectedPromotion.products.forEach(promoProduct => {

                        const comparePromoProd = promo.products.find(prod => prod.productId === promoProduct.productId);

                        const showProduct = comparePromoProd && onlyNumberStringToFloatNumber(comparePromoProd.valueCents) >= onlyNumberStringToFloatNumber(promoProduct.valueCents);

                        if (showProduct) {
                            arr.push(promoProduct);
                        }

                    });

                });

                console.log('arr: ', arr);

                return arr;

            } else {
                return [];
            }
        },
        [selectedPromotion]
    )

    return (
        <StyledPromocoesPage>
            <div className="title-section">
                <h1>{selectedPromotion.title}</h1>
                <p>{selectedPromotion.description}</p>
            </div>
            <div className="products-grid-container">
                {mapperedProducts.map(product => <ProductCardComponent key={product.id} {...product} />)}
            </div>
        </StyledPromocoesPage>
    )

}

const mapStateToProps = store => ({
    promotionalProducts: store.productState.promotionalProducts,
    promotions: store.productState.promotions,
    selectedPromotion: store.productState.selectedPromotion,
})

export default connect(mapStateToProps)(PromocoesPage);
