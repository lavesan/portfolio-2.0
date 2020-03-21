import styled, { css } from 'styled-components';

const ButtonCss = css`
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
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

export const StyledRevSuccessButton = styled.button`
    ${ButtonCss}
    ${({ theme }) => css`
        color: ${theme.green.primary};
        background-color: #fff;
        border: thin solid #fff;
    `}
`;
