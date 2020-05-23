import styled, { css } from 'styled-components';

const ButtonStyled = css`
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledSucessButton = styled.button`
    ${({ theme }) => css`
        ${ButtonStyled}
        background-color: ${theme.white.primary};
        border: thin solid ${theme.gray.secondary};
        color: ${theme.gray.secondary};
        padding: 10px 20px;
    `}
`;

export const StyledSucessLink = styled.a`
    ${({ theme }) => css`
        ${ButtonStyled}
        background-color: ${theme.white.primary};
        border: thin solid ${theme.gray.secondary};
        color: ${theme.gray.secondary};
        padding: 10px 20px;
        text-decoration: none;

        :active, :hover {
            text-decoration: none;
        }
    `}
`;
