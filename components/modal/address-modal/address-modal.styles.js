import styled, { css } from 'styled-components';

export const StyledAddressModal = styled.div`
    ${({ theme }) => css`

        color: ${theme.gray.secondary};
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

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

        .sender-image {
            width: 200px;
        }

        .text-paragrah {
            margin-top: 0;
            text-align: center;
            .highlight-text-paragraph {
                font-size: 1.3rem;
                color: ${theme.green.primary};
            }
        }

    `}
`;
