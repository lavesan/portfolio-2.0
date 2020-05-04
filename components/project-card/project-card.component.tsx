import React from 'react';

import { StyledProjectCard } from './project-card.styles';
import { IProjectCard } from './project-card.interfaces';

export default ({ id, name, description, tools, url, imgs }: IProjectCard) => {

    return (
        <StyledProjectCard>
            <p><strong>{name}</strong></p>
            <p>{description}</p>
            <p>Ferramentas</p>
            <ul>
                {tools.map(tool => <li key={tool}>{tool}</li>)}
            </ul>
            <div className="images-container">

            </div>
        </StyledProjectCard>
    )

}
