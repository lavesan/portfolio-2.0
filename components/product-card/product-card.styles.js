import styled, { css } from 'styled-components';

export const StyledProductCard = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        padding: 10px;
        position: relative;

        .promotional-tag {
            position: absolute;
            top: 0;
            right: 0;
            background-color: ${theme.danger.primary};
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            color: #fff;
            padding: 10px 5px;
            font-size: .8rem;
        }

        .product-image-container {

            overflow: hidden;
            width: 100%;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 120px;
                max-width: 100%;
            }
        }

        .product-name {
            margin: 2px 0;
            font-size: .9rem;
        }

        .price-section {
            height: 45px;
            text-align: center;

            .price-promotion-paragraph {
                text-decoration: line-through;
                text-decoration-color: ${theme.gray.primary};
                color: ${theme.gray.primary};
                margin: 0;
                font-size: .8rem;
            }
    
            .price-paragraph {
                margin: 0;
                width: 100%;
                padding: 0;
                text-align: center;
    
                .price-text {
                    color: #aaa;
                    font-size: .8rem;
                    margin-right: 5px;
                }
                .price-value {
                    text-align: center;
                    width: 50%;
                    color: ${theme.green.secondary};
                    font-size: 1.1rem;
                    font-weight: bolder;
                }
            }
        }

        .submit-button {
            width: 100%;
        }
    `}
`;
