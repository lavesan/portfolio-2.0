import React, { useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { ProductCardComponent } from '../../components/product-card';
import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';
import { setPromotionalProducts, setCategoryProducts, addCategoryProducts, setCategoryProductsPages, addCategoryProductFilter } from '../../store/actions/productActions';
import ProductService from '../../services/product.service';
import { CategoryResponsiveCardComponent } from  '../../components/category-responsive-card';
import { HorizontalSlideComponent } from '../../components/horizontal-slide';

const InicioPage = ({ dispatch, screenWidth, categoryProducts, categories, promotions, combos }) => {

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

                    const promotionalProduct = productsFromPromotion.filter(promoProd => promoProd.id === product.id);

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

    const productService = ProductService.getInstance();

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

    const paginateCategory = ({ plus, categoryId }) => {
        dispatch(setCategoryProductsPages({ plus, categoryId }));
    }

    useEffect(() => {
        loadInitialProducts();
    }, [loadInitialProducts])

    return (
        <StyledStartPage>
            <section className="promo-combos-section">
                {promotions && promotions.length &&
                    <>
                        {screenWidth <= 1100
                            ? <Swiper {...params}>
                                {promotions.map(promo => (
                                    <div key={promo.id}>
                                        <PeriodCardComponent isBig={true} {...promo} />
                                    </div>
                                ))}
                            </Swiper>
                            : <>
                                {promotions.map((promo, index) => (
                                    <>
                                        {index === 0
                                            ? <div className="promos-section">
                                                <PeriodCardComponent isPromotion={true} {...promo} />
                                            </div>
                                            : <div className="combos-section">
                                                <PeriodCardComponent key={index} {...promo} />
                                            </div>
                                        }
                                    </>
                                ))}
                            </>
                        }
                    </>
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
                <HorizontalSlideComponent className="products-container">
                    {combos && combos.length && combos.map(combo => (
                            <div key={combo.id}>
                                <ProductCardComponent
                                    quantitySuffix="x"
                                    imgUrl={combo.imgUrl}
                                    name={combo.title}
                                    actualValueCents={combo.totalValue}
                                    {...combo} />
                            </div>
                    ))}
                </HorizontalSlideComponent>
                {mappedProductsWithPromotions.map(({ category, products, page }) => (
                    <>
                        {products.length ?
                            <div key={category.id}>
                                <div className="products-category-header">
                                    <h3>{category.name}</h3>
                                    <div className="navigate-buttons">
                                        <button
                                            className={`navigate-left ${page <= 1 ? 'disabled' : ''}`}
                                            onClick={() => paginateCategory({
                                                categoryId: category.id,
                                                plus: false,
                                            })}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <button
                                            onClick={() => paginateCategory({
                                                categoryId: category.id,
                                                plus: true,
                                            })}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                    </div>
                                </div>
                                <HorizontalSlideComponent className="products-container">
                                    {products.map(product =>
                                        <div key={product.id}>
                                            <ProductCardComponent {...product} />
                                        </div>
                                        )
                                    }
                                </HorizontalSlideComponent>
                            </div>
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
