import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';

import { ProductCardComponent } from '../../components/product-card';
import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';


const InicioPage = ({ comments, screenWidth }) => {

    const [products, setProducts] = useState([
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', actualValueCents: '2000', id: 1, quantitySuffix: 'kg', description: 'Vei, é um produto legal e bal bal bla asddiqon eoin sdonaoin uibyu vbyc yt ty vu uyn byub yubmuiniumn yuvrhd edget  ynu bm h b u bu t crt  ct  yvbhm ni  n hub y bm hni,'
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Sei lá', actualValueCents: '4000', id: 2, quantitySuffix: 'kg',
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', actualValueCents: '300', id: 3, quantitySuffix: 'kg',
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', actualValueCents: '50', id: 4, quantitySuffix: 'kg',
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', actualValueCents: '100', id: 5, quantitySuffix: 'kg',
        },
    ]);

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
                {products.map((product, index) => <ProductCardComponent key={index} {...product} />)}
            </section>
        </StyledStartPage>
    )
}

const mapStateToProps = store => ({
    comments: store.commentState.comments,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(InicioPage);
