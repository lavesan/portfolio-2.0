import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import { useRouter } from "next/router";

import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';
import { setProductFilters } from '../../store/actions/productActions';
import { CategoryResponsiveCardComponent } from  '../../components/category-responsive-card';
import { ProductsRowComponent } from './products-row';

const InicioPage = ({ dispatch, screenWidth, categoryProducts, categories, promotions, combos }) => {

    const router = useRouter();

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
        [promotions, categoryProducts]
    )

    const orderPromotions = useMemo(
        () => {

            const orderedPromos = [];

            promotions.forEach(promo => {

                if (promo.isPrincipal) {
                    orderedPromos.unshift(promo);
                } else {
                    orderedPromos.push(promo);
                }

            })

            return orderedPromos;

        },
        [promotions]
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

    const onCategoryClick = category => {
        dispatch(setProductFilters(
            [
                {
                    type: 'equals',
                    field: 'cat.id',
                    value: category.id,
                    label: category.name,
                },
            ]
        ));
        router.push('/produtos');
    }

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
                                {orderPromotions.map((promo) => (
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
                                                {promo.isPrincipal
                                                    ? <div className="promos-section">
                                                        <PeriodCardComponent isPromotion={true} {...promo} />
                                                    </div>
                                                    : <div className="combos-section">
                                                        <PeriodCardComponent key={promo.id} {...promo} />
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
            {screenWidth < 750
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
                            isCombo: true,
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
