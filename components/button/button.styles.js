import styled, { css } from 'styled-components';

const ButtonCss = css`
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
`;

export const StyledSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme, disabled }) => css`
        color: #fff;
        background-color: ${theme.green.primary};
        border: thin solid ${theme.green.primary};
        ${disabled && css`
            opacity: .6;
            pointer-events: none;
        `}
    `}
`;

export const StyledRevSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme }) => css`
        color: ${theme.green.primary};
        background-color: #fff;
        border: thin solid #fff;
    `}
`;
