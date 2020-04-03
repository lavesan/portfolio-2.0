import styled, { css } from 'styled-components';

export const StyledCarrinhoPage = styled.div`
    ${({ screenWidth, isResponsive }) => css`
        display: flex;
        flex-flow: row nowrap;
        position: relative;

        .stepper-container {
            margin-right: 30px;
            width: 50%;

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

        ${isResponsive && css`
            .stepper-container {
                width: 100%;
            }
        `}
    `}
`;
