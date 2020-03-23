import React, { useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';

import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';
import { setPromotionalProducts, setCategoryProducts, addCategoryProductFilter } from '../../store/actions/productActions';
import { CategoryResponsiveCardComponent } from  '../../components/category-responsive-card';
import { ProductsRowComponent } from './products-row';
import { productInstance } from '../../services/product.service';

const InicioPage = ({ dispatch, screenWidth, categoryProducts, categories, promotions, combos }) => {

    const productService = productInstance.getInstance();

    const mapCategoriesToLinear = useMemo(
        () => {

            const getAllCategories = ([category, ...categories]) => {

                if (!category) {
                    return [];
                }

                const childrens = category.childrens ? category.childrens : [];

                return [
                    category,
                    ...childrens,
                    ...getAllCategories(categories),
                ];

            }

            return getAllCategories(categories);
        },
        [categories]
    )

    const mappedProductsWithPromotions = useMemo(
        () => {

            let productsFromPromotion = [];
            promotions.forEach(promo => {
                productsFromPromotion = productsFromPromotion.concat(promo.products);
            })

            return categoryProducts.map(catProd => ({
                ...catProd,
                products: catProd.products.map(product => {

                    const promotionalProduct = productsFromPromotion.filter(promoProd => promoProd && product && promoProd.id === product.id);

                    let value = '0';
                    if (promotionalProduct && promotionalProduct.length) {

                        value = promotionalProduct[0].valueCents;

                        promotionalProduct.forEach(promoProd => {
                            if (Number(promoProd.valueCents) < Number(value)) {
                                value = Number(promoProd.valueCents);
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
        [promotions, categoryProducts]
    )

    const params = {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    }

    const onCategoryClick = (category) => {
        dispatch(addCategoryProductFilter(category));
    }

    const loadInitialProducts = useCallback(
        async () => {
            await productService.findProductsPromotions()
                .then(res => {
                    dispatch(setPromotionalProducts(res));
                });
            productService.findProductsFromCategories()
                .then(res => {
                    dispatch(setCategoryProducts(res));
                });
        },
        [productService]
    )

    useEffect(() => {
        loadInitialProducts();
    }, [loadInitialProducts])

    return (
        <StyledStartPage>
            <section className="promo-combos-section">
                {promotions && promotions.length ?
                    <>
                        {screenWidth <= 1100
                            ? <Swiper {...params}>
                                {promotions.map(promo => (
                                    <div key={promo.id}>
                                        {promo.loadingPromotions
                                            ? <div className="promos-section">
                                                <div className="loading-promotion">
                                                    <div className="load-1"></div>
                                                    <div className="load-2"></div>
                                                    <div className="load-3"></div>
                                                </div>
                                            </div>
                                           : <div>
                                                <PeriodCardComponent isBig={true} {...promo} />
                                            </div>
                                        }
                                    </div>
                                ))}
                            </Swiper>
                            : <>
                                {promotions.map((promo, index) => (
                                    <>
                                        {promo.loadingPromotions
                                            ? <div className="promos-section">
                                                <div className="loading-promotion">
                                                    <div className="load-1"></div>
                                                    <div className="load-2"></div>
                                                    <div className="load-3"></div>
                                                </div>
                                            </div>
                                            : <>
                                                {index === 0
                                                    ? <div className="promos-section">
                                                        <PeriodCardComponent isPromotion={true} {...promo} />
                                                    </div>
                                                    : <div className="combos-section">
                                                        <PeriodCardComponent key={index} {...promo} />
                                                    </div>
                                                }
                                            </>
                                        }
                                    </>
                                ))}
                            </>
                        }
                    </>
                    : ''
                }
            </section>
            {screenWidth <= 750
                ? <div className="categories-section">
                    <h2>Categoria de produtos</h2>
                    <div className="categories-row">
                        {mapCategoriesToLinear.map(category => <CategoryResponsiveCardComponent key={category.id} onClick={() => onCategoryClick(category)} {...category} />)}
                    </div>
                </div>
                : ''
            }
            <section className="product-section">
                {combos.length
                    ? <ProductsRowComponent
                        products={combos.map(combo => ({
                            ...combo,
                            quantitySuffix: "x",
                            imgUrl: combo.imgUrl,
                            name: combo.title,
                            actualValueCents: combo.totalValue,
                        }))}
                        category={{
                            name: 'Combos',
                            id: 0,
                        }} />
                    : <></>
                }
                {mappedProductsWithPromotions.map((data) => (
                    <>
                        {data.products.length ?
                            <ProductsRowComponent key={data.category.id} {...data} />
                            : <></>
                        }
                    </>
                )
                )}
            </section>
        </StyledStartPage>
    )
}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
    categoryProducts: store.productState.categoryProducts,
    promotions: store.productState.promotions,
    combos: store.productState.combos,
    categories: store.categoryState.categories,
});

export default connect(mapStateToProps)(InicioPage);
