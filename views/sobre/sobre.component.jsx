import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { StyledAboutPage } from './sobre.styles';
import { DarkerImage } from '../../components/darker-image';
import { CommentCardComponent } from '../../components/comment-card';
import { setComments } from '../../store/actions/commentActions';
import { HorizontalSlideComponent } from '../../components/horizontal-slide';
import { commentInstance } from '../../services/comment.service';

const SobrePage = ({ comments, dispatch }) => {

    const commentService = commentInstance.getInstance();

    const reloadComments = useCallback(
        async () => {

            const commentsRes = await commentService.getComments();

            dispatch(setComments(commentsRes));

        },
        []
    )

    const aboutText = 'Somos uma pequena empresa de produção e comércio de hortaliças orgânicas certificada pela IMO control, cuja filosofia é levar orgânicos com carinho, qualidade e simplicidade a preço acessível para todos.Também dispomos de ovos orgânicos e de grãos, oleaginosas, chás e temperos a granel (apenas naturais, não orgânicos).';

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
                    <p>{aboutText}</p>
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
