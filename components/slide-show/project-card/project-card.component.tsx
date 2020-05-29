import React, { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons';

import { StyledProjectCard } from './project-card.styles';
import { IProjectCard } from './project-card.interfaces';
import { StyledSucessButton } from '../../button';
import { toggleProjectModal } from '../../../store/actions/modalActions';
// @ts-ignore
import myImage from '../../../public/static/imgs/gabriel-pensador.jpg';

const ProjectCardComponent = ({ selected, onTouchStart, disappear, ...project }: IProjectCard) => {

    const dispatch = useDispatch();

    const toggleModal = useCallback(
        () => {
            dispatch(toggleProjectModal(project));
        },
        []
    )

    return (
        <StyledProjectCard imgUrl={project.imgs[0] ? project.imgs[0] : myImage} selected={selected} onTouchStart={onTouchStart} disappear={disappear}>
            <div className={`project-filter ${selected && ''}`} />
            <FontAwesomeIcon className="project-clickable-icon" icon={faHandPointDown} onTouchStart={onTouchStart} />
            <div className={`project-brief-info ${selected && 'selected-project'}`}>
                <p className="project-name">{project.name}</p>
                <StyledSucessButton onClick={toggleModal}>Ver mais</StyledSucessButton>
            </div>
        </StyledProjectCard>
    )

}

export default connect()(ProjectCardComponent);
