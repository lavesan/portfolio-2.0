import styled, { css } from 'styled-components';

export const StyledTextArea = styled.textarea`
    ${({ theme, error }) => css`
        border-radius: 5px;
        border: none;
        background-color: ${theme.gray.terciary};
        font-size: .9rem;
        padding: 10px 20px;
        outline: none;
        resize: none;

        ::placeholder {
            color: ${theme.gray.quaternary};
        }

        legend {
            font-size: .8rem;
        }

        ${error && css`
            color: ${theme.danger.primary};
        `}
    `}
`;
