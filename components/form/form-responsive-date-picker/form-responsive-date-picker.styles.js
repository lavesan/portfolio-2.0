import styled, { css } from 'styled-components';

export const StyledInputDatePicker = styled.button`
    ${({ theme, error, disabled }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        height: 40px;
        outline: none;
        color: ${theme.gray.terciary};
        width: 100%;

        ::placeholder {
            color: ${theme.gray.quaternary};
        }

        ${error && css`
            border-color: ${theme.danger.primary};
            color: ${theme.danger.primary};
        `}

        ${disabled && css`
            pointer-events: none;
            opacity: .7;
        `}
    `}
`;

export const StyledParagraphDate = styled.p`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        margin: 0;
        font-size: .9rem;
        position: absolute;
        bottom: 33px;
        left: 10px;
    `}
`
