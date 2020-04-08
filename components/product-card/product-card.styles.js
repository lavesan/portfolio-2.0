import styled, { css } from 'styled-components';

export const StyledProductCard = styled.div`
    ${({ theme, isDisabled }) => css`
        position: relative;
        height: 100%;

        .disabled-paragraph {
            margin: 0;
            color: ${theme.green.terciary};
            position: absolute;
            top: 45%;
            left: 26%;
            z-index: 3;
        }
        .product-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column nowrap;
            padding: 10px;
            position: relative;
            border-radius: 4px;
            height: 100%;
            box-sizing: border-box;
            transition: box-shadow .3s;

            :hover {
                box-shadow: 0 0 6px -1px ${theme.gray.primary};
            }

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
                    cursor: pointer;
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
                margin-top: auto;
            }

            ${isDisabled && css`
                -webkit-filter: blur(2px);
                filter: blur(2px);
                box-shadow: none;
                pointer-events: none;
            `}
        }
        .court {
            position: absolute;
            background-color: ${theme.gray.primary};
            opacity: .6;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
            border-radius: 4px;
        }
    `}
`;
