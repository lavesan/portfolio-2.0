import styled, { css } from 'styled-components';

export const StyledAddressModal = styled.div`
    ${({ theme }) => css`

        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        .sender-image {
            width: 200px;
        }

        .text-paragrah {
            margin-top: 0;
            text-align: center;
            font-size: .9rem;
            .highlight-text-paragraph {
                font-size: 1.3rem;
                color: ${theme.green.primary};
            }
        }

        .find-cep-form {
            width: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0;
        }

    `}
`;
