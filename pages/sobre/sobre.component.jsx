import React from 'react';
import { StyledAboutPage } from './sobre.styles';
import { DarkerImage } from '../../components/darker-image';

export default () => {
    return (
        <StyledAboutPage>
            <div className="about-info-container">
                <div className="images-container">
                    <DarkerImage src="https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg" />
                    <div className="small-images">
                        <DarkerImage src="https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg" />
                        <DarkerImage src="https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg" />
                        <DarkerImage src="https://w1.ezcdn.com.br/falconarmas/fotos/grande/22154fg1/espada-de-samurai-katana-avb-lamina-de-70cm-preta-bainha-de-madeira.jpg" />
                    </div>
                </div>
                <div className="text-container">
                    <h1>A gente cuida de você lá do início, na escolha dos nossos produtos.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam tempore error laborum sequi totam blanditiis commodi eos saepe debitis suscipit ipsam, molestias explicabo soluta! Odio perferendis itaque fugit consectetur.</p>
                </div>
            </div>
            <div>
                <h2 className="comments-title">Comentários dos clientes</h2>
                <div className="comments-container">

                </div>
            </div>
        </StyledAboutPage>
    )
}
