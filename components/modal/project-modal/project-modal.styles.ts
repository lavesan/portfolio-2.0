import styled, { css } from 'styled-components';

import { IStyledProjectImage } from './project-modal.interfaces';

export const StyledProjectModal = styled.div`
    width: 550px;
    padding: 20px;
    .modal-projects-container {
        width: 100%;
    }
    .action-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;

        > * {
            width: 100px;
        }
    }
`;

export const StyledProjectImage = styled.div<IStyledProjectImage>`
    ${({ imgUrl }) => css`
        background-image: url(${imgUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 300px;
    `}
`;
