import styled, { css } from 'styled-components';

export const StyledModal = styled.div`
    ${({ theme }) => css`
        position: relative;

        .close-button {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            outline: none;
            background: none;
            border: none; 
            text-decoration-color: ${theme.gray.secondary};
            text-decoration: underline;
        }
    `}
`;
