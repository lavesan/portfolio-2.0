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

        .action-buttons--icon {
            width: 15px;
            margin-right: 10px;
        }
    }

    .technology-title {
        font-weight: bolder;
        margin-bottom: 3px;
    }

    .technology-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;

        .technology-list--dot {
            width: 10px;
        }

        > * {
            width: 33%;
        }
    }

    @media(max-width: 450px) {
        .action-buttons {
            flex-flow: column nowrap;
            justify-content: center;

            > * {
                width: 100%;
            }

            > :not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }

    @media(max-width: 670px) {
        width: 400px;

        .technology-list > * {
            width: 50%;
        }
    }
    @media(max-width: 510px) {
        width: calc(100vw - 120px);
    }
`;

export const StyledProjectImage = styled.div<IStyledProjectImage>`
    ${({ imgUrl }) => css`
        background-image: url(${imgUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: auto 100%;
        width: 100%;
        height: 300px;
    `}
`;
