import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { StyledAboutPage } from './sobre.styles';
import { DarkerImage } from '../../components/darker-image';
import { CommentCardComponent } from '../../components/comment-card';
import { CommentService } from '../../services/comment.service';
import { setComments } from '../../store/actions/commentActions';
import { HorizontalSlideComponent } from '../../components/horizontal-slide';

const SobrePage = ({ comments, dispatch }) => {

    const commentService = new CommentService();

    const reloadComments = useCallback(
        async () => {

            const commentsRes = await commentService.getComments();

            // console.log('commentsRes: ', commentsRes);
            dispatch(setComments(commentsRes));

        },
        []
    )

    useEffect(() => {
        reloadComments();
    }, [reloadComments]);

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
                <HorizontalSlideComponent className="comments-container">
                    {comments.map(comment => 
                        <div key={comment.id}>
                            <CommentCardComponent {...comment} />
                        </div>)
                    }
                </HorizontalSlideComponent>
            </section>
        </StyledAboutPage>
    )
}

const mapStateToProps = store => ({
    comments: store.commentState.comments,
})

export default connect(mapStateToProps)(SobrePage);
