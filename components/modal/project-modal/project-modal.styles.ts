import styled, { css } from 'styled-components';

import { IStyledProjectImage } from './project-modal.interfaces';

export const StyledProjectModal = styled.div`
    .action-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
`;

export const StyledProjectImage = styled.div<IStyledProjectImage>`
    ${({ imgUrl }) => css`
        background:
            linear-gradient(
                rgba(0, 0, 0, 0.3), 
                rgba(0, 0, 0, 0.3)
            ), url(${imgUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    `}
`;
