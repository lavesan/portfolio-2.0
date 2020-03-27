import styled, { css } from 'styled-components';

export const StyledRadioFormContainer = styled.div`
    ${({ row }) => css`
        box-sizing: border-box;
        border: none;
        padding: 0;
        display: flex;
        flex-flow: ${row ? 'row' : 'column'} nowrap;

        > * {
            margin-bottom: 10px;
            padding: ${row ? '10px' : 0} 20px;
        }

        ${row && css`
            > :not(:last-child) {
                margin-right: 10px;
            }
        `}
    `}
`;

export const StyledFormRadio = styled.div`
    ${({ theme, isSelected }) => css`
        border-radius: 5px;
        border: thin solid ${theme.gray.terciary};
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: pointer;

        .circle {
            background-color: #fff;
            border: 2px solid ${theme.gray.quaternary};
            border-radius: 50%;
            width: 15px;
            height: 15px;
            min-width: 15px;
            min-height: 15px;
            margin-right: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            div {
                width: 0;
                height: 0;
                background-color: ${theme.gray.quaternary};
                transition: .3s;
                border-radius: 50%;
            }
        }
        .label {
            width: 100%;
        }

        ${isSelected && css`
            border-color: ${theme.green.primary};
            .selected {
                width: 10px;
                height: 10px;
                min-width: 10px;
                min-height: 10px;
            }
        `}
    `}
`;
