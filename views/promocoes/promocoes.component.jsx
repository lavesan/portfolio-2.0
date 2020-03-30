import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyledPromocoesPage } from './promocoes.styles';
import { ProductCardComponent } from '../../components/product-card';
import { onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { productInstance } from '../../services/product.service';

const PromocoesPage = ({ promotions, promotionalProducts, selectedPromotion, dispatch }) => {

    const productService = productInstance.getInstance();

    const mapperedProducts = useMemo(
        () => {

            if (selectedPromotion.products && selectedPromotion.products.length) {

                const arr = [];

                promotions.forEach(promo => {

                    selectedPromotion.products.forEach(promoProduct => {

                        const comparePromoProd = promo.products.find(prod => prod.id === promoProduct.id);

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

    useEffect(() => {
        console.log('promotions: ', promotions);
        console.log('selectedPromotion: ', selectedPromotion);
        console.log('produtos: ', selectedPromotion.products);
    }, [])

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
