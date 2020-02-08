import styled, { css } from 'styled-components';

export const StyledProductCard = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        padding: 10px;

        .product-image-container {

            overflow: hidden;
            width: 100%;
            height: 180px;

            img {
                width: 100%;
            }
        }

        .product-name {
            margin: 10px 0;
            font-size: 1rem;
        }

        .price-paragraph {
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0 40px;

            .price-text {
                color: #aaa;
                font-size: .9rem;
            }
            .price-value {
                text-align: center;
                width: 50%;
                color: ${theme.green.primary};
                font-size: 1.2rem;
                font-weight: bolder;
            }
        }

        .submit-button {
            width: 100%;
        }
    `}
`;
