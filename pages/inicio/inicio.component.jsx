import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { ProductCardComponent } from '../../components/product-card';
import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';
import { setPromotionalProducts, setCategoryProducts, addCategoryProducts, setCategoryProductsPages } from '../../store/actions/productActions';
import ProductService from '../../services/product.service';

const InicioPage = ({ comments, dispatch, screenWidth, categoryProducts, categoryProductsPage }) => {

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

    const loadInitialProducts = useCallback(
        () => {
            productService.findProductsPromotions()
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
        console.log('clicando 1')
        dispatch(setCategoryProductsPages({ plus, categoryId }));
    }

    useEffect(() => {
        loadInitialProducts();
    }, [loadInitialProducts])

    useEffect(() => {
        console.log('categoryProducts: ', categoryProducts);
    }, [categoryProducts])

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
                                <div className="products-container">
                                    {products.map(product => <ProductCardComponent key={product.id} {...product} />)}
                                </div>
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
    comments: store.commentState.comments,
    screenWidth: store.uiState.screenWidth,
    categoryProducts: store.productState.categoryProducts,
    categoryProductsPage: store.productState.categoryProductsPage,
});

export default connect(mapStateToProps)(InicioPage);
