import styled, { css } from 'styled-components';

const ButtonCss = css`
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
    outline: none;
`;

export const StyledSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme, disabled, notDense }) => css`
        color: #fff;
        background-color: ${theme.green.primary};
        border: thin solid ${theme.green.primary};
        ${disabled && css`
            opacity: .6;
            pointer-events: none;
        `}

        ${notDense && css`
            font-size: 1.1rem;
            padding: 15px 30px;
        `}
    `}
`;

export const StyledSuccessLink = styled.a`
    ${ButtonCss}
    ${({ theme }) => css`
        color: #fff;
        background-color: ${theme.green.primary};
        border: thin solid ${theme.green.primary};
        text-decoration: none;
    `}
`

export const StyledRevSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme }) => css`
        color: ${theme.green.primary};
        background-color: #fff;
        border: thin solid #fff;
    `}
`;

export const StyledFullRevSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme, disabled }) => css`
        color: ${theme.green.primary};
        background-color: #fff;
        border: thin solid ${theme.green.primary};

        ${disabled && css`
            opacity: .7;
            pointer-events: none;
        `}
    `}
`;
