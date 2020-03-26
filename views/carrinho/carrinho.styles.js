import styled, { css } from 'styled-components';

export const StyledCarrinhoPage = styled.div`
    ${({ screenWidth }) => css`
        display: flex;
        flex-flow: row nowrap;
        position: relative;

        .stepper-container {
            margin-right: 30px;

            > * {
                margin-bottom: 20px;
            }
        }

        .cart-container {
            position: sticky;
            top: 10px;
            right: 0;
            width: ${screenWidth / 2};
            height: 100%;
        }

        > * {
            width: 50%;
        }
    `}
`;
