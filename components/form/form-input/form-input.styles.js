import styled, { css } from 'styled-components';

export const StyledNeultralInput = styled.input`
    ${({ theme }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        outline: none;

        ::placeholder {
            color: ${theme.gray.quaternary};
        }
    `}
`;
