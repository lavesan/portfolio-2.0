import styled, { css } from 'styled-components';

export const StyledBlankTextarea = styled.textarea`
    ${({ theme }) => css`
        position: relative;
        background-color: #fff;
        border: thin solid ${theme.gray.primary};
        border-radius: 5px;
        font-size: .9rem;
        padding: 10px;
        outline: none;
        resize: none;

        .optional-message {
            position: absolute;
            right: 10px;
            bottom: 30px;
        }
    `}
`;
