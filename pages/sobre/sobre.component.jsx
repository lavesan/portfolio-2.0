import React, { useState } from 'react';
import { StyledAboutPage } from './sobre.styles';
import { DarkerImage } from '../../components/darker-image';
import { CommentCardComponent } from '../../components/comment-card';

export default () => {

    const [comments, setComments] = useState([
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Alberta',
            age: 23,
            comment: 'Eu gostei para um caramba vei',
        },
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Rodrigão',
            age: 23,
            comment: 'Cê loko, bom demais meu parça!',
        },
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Lorem',
            age: 23,
            comment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, doloremque? Nemo minima, labore, dicta enim vero expedita debitis provident exercitationem fugit ducimus non reprehenderit. A et voluptatem veniam ea vel!',
        },
    ]);

    return (
        <StyledAboutPage>
            <section className="about-info-container">
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
            </section>
            <section>
                <h2 className="comments-title">Comentários dos clientes</h2>
                <div className="comments-container">
                    {comments.map((comment, index) => <CommentCardComponent key={index} {...comment} />)}
                </div>
            </section>
        </StyledAboutPage>
    )
}
