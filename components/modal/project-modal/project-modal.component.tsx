import React, { useEffect } from 'react';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

import { StyledProjectModal, StyledProjectImage } from './project-modal.styles';
import { toggleProjectModal } from '../../../store/actions/modalActions';
import { setSmoothScroll } from '../../../store/actions/uiActions';
import { ModalComponent } from '../';
import { IReduxStates } from '../../../store/types';
import { StyledSucessLink } from '../../button';

const mapStateToProps = (store: IReduxStates) => ({
    showProjectModal: store.modalState.showProjectModal,
    selectedProject: store.modalState.selectedProject,
});

const connector = connect(mapStateToProps);

const ProjectModalComponent = ({ selectedProject, showProjectModal }: ConnectedProps<typeof connector>) => {

    const dispatch = useDispatch();

    const toggleModal = () => {

        dispatch(setSmoothScroll(false));
        dispatch(toggleProjectModal());
        setTimeout(() => {
            dispatch(setSmoothScroll(true));
        }, 1000);

    }

    const swipperPàrams = {
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
        <ModalComponent show={showProjectModal} toggleModal={toggleModal}>
            <StyledProjectModal>
                {selectedProject && (
                    <>
                        <div className="modal-projects-container">
                            <Swiper {...swipperPàrams}>
                                {selectedProject.imgs.map(img => <StyledProjectImage key={img} imgUrl={img} />)}
                            </Swiper>
                        </div>
                        <h2>{selectedProject.name}</h2>
                        <p>{selectedProject.description}</p>
                        <p className="technology-title">Tecnologias</p>
                        <div className="technology-list">
                            {selectedProject.tools.map(tool => (
                                <p key={tool}>
                                    <FontAwesomeIcon className="technology-list--dot" icon={faDotCircle} /> {tool}
                                </p>
                            ))}
                        </div>
                        {/* <ul>
                            {selectedProject.tools.map(tool => <li key={tool}>{tool}</li>)}
                        </ul> */}
                        <div className="action-buttons">
                            {selectedProject.codeUrl && 
                                <StyledSucessLink
                                    href={selectedProject.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Ver código
                                </StyledSucessLink>
                            }
                            {selectedProject.url &&
                                <StyledSucessLink
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Ver site
                                </StyledSucessLink>
                            }
                        </div>
                    </>
                )}
            </StyledProjectModal>
        </ModalComponent>
    )

}

export default connector(ProjectModalComponent);
