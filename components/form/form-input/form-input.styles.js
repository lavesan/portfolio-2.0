import styled, { css } from 'styled-components';

export const StyledNeultralInput = styled.input`
    ${({ theme, error, disabled }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        outline: none;
        color: ${theme.gray.secondary};

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
