import styled, { css } from 'styled-components';

export const StyledAddOrderCommentModal = styled.form`
    ${({ theme, isResponsive }) => css`
        color: ${theme.gray.secondary};
        font-weight: 600;

        .title-container {
            background-color: ${theme.green.terciary};
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            width: 100%;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            box-sizing: border-box;

            h2 {
                text-align: center;
                width: 100%;
                margin: 10px;
                font-size: 1.1rem;
            }
        }
        .modal-body {
            padding: 0 10px 10px 10px;

            .products-title {
                margin-top: 60px;
            }

            h3 {
                color: ${theme.green.primary};
                font-size: 1.1rem;
            }

            .second-titles {
                margin-top: 10px;
                margin-bottom: 3px;
            }

            .product-row {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;

                .product-row--price {
                    font-weight: 500;
                }
            }

            .order-data {
                color: ${theme.gray.primary};
                font-size: 1.1rem;
                margin: 0 0 10px 0;
            }

            .value-container {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-size: 1rem;

                p {
                    margin: 0;
                }

                .value-text {
                    color: ${theme.gray.primary};
                }

                div {
                    flex: 1;
                    border: .5px dotted ${theme.gray.primary};
                    margin: auto 20px;
                }

                .value-total {
                    color: ${theme.green.terciary};
                }
            }

            .button-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                margin-top: 20px;
            }
        }

        ${isResponsive && css`
            .modal-body {
                padding: 0;

                .products-title {
                    margin: 0;
                }
                .product-description-textarea-container {
                    margin-bottom: 70px;
                }
                .button-container button {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-radius: 0;
                    width: 100%;
                    padding: 20px 0;
                    font-size: 1rem;
                    box-sizing: border-box;
                    margin: 0;
                    margin-top: auto;
                }
            }
        `}
    `}
`;
