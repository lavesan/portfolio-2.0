import styled, { css } from 'styled-components';

export const StyledFormRadio = styled.div`
    ${({ theme }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

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
            .selected {
                width: 10px;
                height: 10px;
                min-width: 10px;
                min-height: 10px;
            }
        }
        label {
            cursor: pointer;
            color: ${theme.gray.secondary};
        }
    `}
`;
