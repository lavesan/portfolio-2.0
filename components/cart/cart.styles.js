import styled, { css } from 'styled-components';

export const StyledCartComponent = styled.section`
    display: flex;
    flex-flow: row nowrap;

    > * {
        width: 50%;
    }

    ${({ theme }) => css`
        .cart-container {
            box-shadow: 0 0 8px 1px ${theme.gray.primary};
            border-radius: 5px;
            padding: 20px;
        }

        .cart-title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h2 {
                font-size: 1rem;
                font-weight: 600;
                span {
                    font-size: 1.3rem;
                }
            }

            button {
                background: none;
                border: none;
                cursor: pointer;
                color: ${theme.green.primary};
            }
        }

        .cart-products-container {
            overflow-y: scroll;
            max-height: 400px;
        }
        
        .cart-total-value-container {
            text-align: end;
            font-size: 1.2rem;
            color: ${theme.green.terciary};
        }
    `}
`;
