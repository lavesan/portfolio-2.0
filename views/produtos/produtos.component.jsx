import React, { useMemo, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { StyledProdutosPage } from './produtos.styles';
import { StyledSuccessLink } from '../../components/button';
import { ProductCardComponent } from '../../components/product-card';
import { removeProductFilter, setFilteredProducts } from '../../store/actions/productActions';
import produtoNaoAchado from '../../public/static/imgs/produto-não-achado.png';
import { productInstance } from '../../services/product.service';

const ProdutosPage = ({ filteredProducts = [], promotions, productFilters, dispatch }) => {

    const productService = productInstance.getInstance();
    
    const mappedProductsWithPromotions = useMemo(
        () => {

            let productsFromPromotion = [];
            promotions.forEach(promo => {
                productsFromPromotion = productsFromPromotion.concat(promo.products);
            })

            return filteredProducts.map(catProd => ({
                ...catProd,
                products: catProd.products.map(product => {

                    const promotionalProduct = productsFromPromotion.filter(promoProd => promoProd && product && promoProd.id === product.id);
                    let bestPromotion = '';
                    promotionalProduct.forEach(promo => {

                        if (!bestPromotion) {
                            bestPromotion = promo;
                        } else if (Number(bestPromotion.promotionalValueCents) > Number(promo.promotionalValueCents)) {
                            bestPromotion = promo;
                        }
                        
                    })

                    let value = '0';
                    if (promotionalProduct && promotionalProduct.length) {

                        value = bestPromotion.promotionalValueCents;

                        promotionalProduct.forEach(promoProd => {
                            if (Number(promoProd.promotionalValueCents) < Number(value)) {
                                value = Number(promoProd.promotionalValueCents);
                            }
                        })

                    }

                    return {
                        ...product,
                        promotionalValueCents: promotionalProduct && promotionalProduct.length ? value : '',
                    }

                }),
            }))
        },
        [promotions, filteredProducts]
    )

    const removeFilter = (filter) => {
        dispatch(removeProductFilter(filter.id));
    }

    const handleFilterChange = useCallback(
        () => {

            productService.findAllFilteredPaginated({}, productFilters)
                .then(res => {
                    const filteredProducts = Array.isArray(res) ? res : res.data
                    dispatch(setFilteredProducts(filteredProducts));
                })
                .catch(err => {
                    console.log('erro: ', err);
                })

        },
        [productFilters]
    )

    useEffect(() => {
        handleFilterChange();
    }, [handleFilterChange]);

    const notFoundProductText = 'Eita! Este produto não foi encontrado :(';

    return (
        <StyledProdutosPage>
            <div className="product-filter-container">
                <div>
                    {mappedProductsWithPromotions.length
                        ? <>
                            <h1 className="result-title">Resultados encontrados</h1>
                            <p className="result-paragraph">Total de <b>{mappedProductsWithPromotions.length} produto{mappedProductsWithPromotions.length === 1 ? '' : 's'}</b></p>
                        </>
                        : ''
                    }
                </div>
                <div className="filter-container">
                    {productFilters.length
                        ? <>
                        <p>Filtrado por:</p>
                        {productFilters.map(filter =>
                            <button
                                type="button"
                                className="filter-button"
                                key={filter.id}
                                >{filter.label} <FontAwesomeIcon onClick={() => removeFilter(filter)} title="Remover filtro" className="delete-icon" icon={faTimes} /></button>)}
                        </>
                        : ''
                    }
                </div>
            </div>
            {mappedProductsWithPromotions.length
                ? <>
                    <div className="products-grid-container">
                        {mappedProductsWithPromotions.map(product => <ProductCardComponent key={product.id} {...product} />)}
                    </div>
                </>
                : <div className="not-found-row">
                    <h1>{notFoundProductText}</h1>
                    <p>Mas você pode nos mandar mensagem no Whatsapp para vermos se conseguimos te ajudar!</p>
                    <img src={produtoNaoAchado} alt="Produto não encontrado" />
                    <StyledSuccessLink href="https://wa.me/5581994122409" target="_blank" rel="noopener noreferrer">
                        Falar com a gente no Whatsapp
                    </StyledSuccessLink>
                </div>
            }
        </StyledProdutosPage>
    )

}

const mapStateToProps = store => ({
    filteredProducts: store.productState.filteredProducts,
    promotions: store.productState.promotions,
    productFilters: store.productState.productFilters,
});

export default connect(mapStateToProps)(ProdutosPage);
