import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const InicioPage = ({ dispatch, screenWidth, categoryProducts, categories }) => {

    const [combos, setCombos] = useState([
        {
            imgUrl: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/os-alimentos-fornecem-nutrientes-necessarios-para-corpo-57065f8e5c260.jpg",
            title: 'CAFÉ DA MANHÃ',
            briefDescription: 'Alimentos para o',
        },
        {
            imgUrl: "https://redesuperpopular.com.br/wp-content/uploads/2019/05/Populares-3.jpg",
            title: 'CEIA DE NATAL',
            briefDescription: 'Alimentos para a',
        },
        {
            imgUrl: "https://caldobom.com.br/wp-content/uploads/2019/03/como-preservar-os-nutrientes-dos-alimentos-1024x768.jpg",
            title: 'JANTAR DE 2020',
            briefDescription: 'Alimentos para o',
        },
        {
            imgUrl: "https://3eaf214443cb92a1.cdn.gocache.net/wp-content/uploads/2018/12/alimentos-760x450.jpg",
            title: 'ROTINA FITNESS',
            briefDescription: 'Alimentos para ',
        },
    ])

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
                {screenWidth <= 1100
                    ? <Swiper {...params}>
                        <div>
                            <PeriodCardComponent
                                imgUrl="https://i.ytimg.com/vi/IvTJ8ob2a2g/maxresdefault.jpg"
                                title="OFERTAS DE FIM DE ANO"
                                briefDescription="Confira os melhores descontos para a ceia de fim de ano"
                                isPromotion={true} />
                        </div>
                        {combos.map((combo, index) =>
                            <div key={index}>
                                <PeriodCardComponent {...combo} isBig={true} />
                            </div>
                        )}
                    </Swiper>
                    : <>
                        <div className="promos-section">
                            <PeriodCardComponent
                                imgUrl="https://i.ytimg.com/vi/IvTJ8ob2a2g/maxresdefault.jpg"
                                title="OFERTAS DE FIM DE ANO"
                                briefDescription="Confira os melhores descontos para a ceia de fim de ano"
                                isPromotion={true} />
                        </div>
                        <div className="combos-section">
                            {combos.map((combo, index) => <PeriodCardComponent key={index} {...combo} />)}
                        </div>
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
                {categoryProducts.map(({ category, products, page }) => (
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
    categories: store.categoryState.categories,
});

export default connect(mapStateToProps)(InicioPage);
