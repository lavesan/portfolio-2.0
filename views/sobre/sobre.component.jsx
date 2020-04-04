import React, { useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledAboutPage } from './sobre.styles';
import { DarkerImage } from '../../components/darker-image';
import { CommentCardComponent } from '../../components/comment-card';
import { setComments } from '../../store/actions/commentActions';
import { HorizontalSlideComponent } from '../../components/horizontal-slide';
import { commentInstance } from '../../services/comment.service';

import image1 from '../../public/static/imgs/sobre-1.jpeg';
import image2 from '../../public/static/imgs/sobre-2.jpeg';
import image3 from '../../public/static/imgs/sobre-3.jpeg';
import image4 from '../../public/static/imgs/sobre-4.jpeg';

const SobrePage = ({ comments, screenWidth, dispatch }) => {

    const commentService = commentInstance.getInstance();

    const reloadComments = useCallback(
        async () => {

            commentService.getComments()
                .then(res => {
                    setComments(res)
                })
                .catch(err => console.log('deu pau: ', err));

        },
        []
    )

    const isResponsive = useMemo(
        () => {
            return screenWidth < 881;
        },
        [screenWidth]
    )

    const aboutText = 'Somos uma pequena empresa de produção e comércio de hortaliças orgânicas certificada pela IMO control, cuja filosofia é levar orgânicos com carinho, qualidade e simplicidade a preço acessível para todos.Também dispomos de ovos orgânicos e de grãos, oleaginosas, chás e temperos a granel (apenas naturais, não orgânicos).';

    useEffect(() => {
        reloadComments();
    }, [reloadComments]);

    return (
        <StyledAboutPage>
            <section className="about-info-container">
                <div className="images-container">
                    {isResponsive &&
                        <h1 className="about-us-title">
                            <span className="smaller-title">Sobre</span>
                            <br/>Nós<span className="about-title-line"></span>
                        </h1>
                    }
                    {isResponsive
                        ? <DarkerImage className="big-image" src={image2} />
                        : <>
                            <DarkerImage className="big-image" src={image1} />
                            <div className="small-images">
                                <DarkerImage src={image2} />
                                <DarkerImage src={image3} />
                                <DarkerImage src={image4} />
                            </div>
                        </>
                    }
                </div>
                <div className="text-container">
                    {!isResponsive &&
                        <h1>A gente cuida de você lá do início, na escolha dos nossos produtos.</h1>
                    }
                    <p>{aboutText}</p>
                </div>
            </section>
            {comments && comments.length
                ? <section>
                    <h2 className="comments-title">Comentários dos clientes</h2>
                    <HorizontalSlideComponent className="comments-container">
                        {comments.map(comment => 
                            <div key={comment.id}>
                                <CommentCardComponent {...comment} />
                            </div>)
                        }
                    </HorizontalSlideComponent>
                </section>
                : ''
            }
        </StyledAboutPage>
    )
}

const mapStateToProps = store => ({
    comments: store.commentState.comments,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(SobrePage);
