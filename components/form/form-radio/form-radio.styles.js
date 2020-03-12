import styled, { css } from 'styled-components';

export const StyledFormRadio = styled.div`
    ${({ theme }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        /* width: 100%; */
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .circle {
            background-color: #fff;
            border: 2px solid ${theme.gray.quaternary};
            border-radius: 50%;
            width: 15px;
            height: 15px;
            margin-right: 20px;
            cursor: pointer;
        }
        label {
            cursor: pointer;
            color: ${theme.gray.secondary};
        }
    `}
`;
