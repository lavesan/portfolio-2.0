import React from 'react';

import { StyledProjectCard } from './project-card.styles';
import { IProjectCard } from './project-card.interfaces';
import { StyledSucessButton } from '../../button';
// @ts-ignore
import myImage from '../../../public/static/imgs/gabriel-pensador.jpg';

export default ({ name, imgs, selected, onTouchStart }: IProjectCard) => {

    return (
        <StyledProjectCard imgUrl={imgs[0] ? imgs[0] : myImage} selected={selected} onTouchStart={onTouchStart}>
            <div className={`project-brief-info ${selected && 'selected-project'}`}>
                <p className="project-name">{name}</p>
                <StyledSucessButton>Ver mais</StyledSucessButton>
            </div>
        </StyledProjectCard>
    )

}
