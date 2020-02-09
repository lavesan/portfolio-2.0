import React, { useState } from 'react';

import { ProductCardComponent } from '../../components/product-card';
import { StyledStartPage } from './inicio.styles';
import { PeriodCardComponent } from '../../components/period-card';

export default () => {

    const [products, setProducts] = useState([
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', price: 'R$ 20,00', isPromotion: true, id: 1
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Sei lá', price: 'R$ 20,00', isPromotion: true, id: 1
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', price: 'R$ 20,00', isPromotion: true, id: 1
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', price: 'R$ 20,00', isPromotion: true, id: 1
        },
        {
            imgUrl: 'https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg', name: 'Arroba', price: 'R$ 20,00', isPromotion: true, id: 1
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

    return (
        <StyledStartPage>
            <section className="promo-combos-section">
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
            </section>
            <section className="product-section">
                {products.map((product, index) => <ProductCardComponent key={index} {...product} />)}
            </section>
        </StyledStartPage>
    )
}