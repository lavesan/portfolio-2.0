import styled, { css } from 'styled-components';

export const StyledPeriodCard = styled.div`
    ${({ imgUrl, isPromotion }) => css`
        position: relative;
        border-radius: 5px;
        background:
            linear-gradient(
                rgba(0, 0, 0, 0.3), 
                rgba(0, 0, 0, 0.3)
            ), url(${imgUrl});
        background-repeat: no-repeat;
        background-size: ${isPromotion ? 'auto' : '100% 100%'};
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        flex-flow: column nowrap;

        &.combo-card {
            padding: 30px;

            p {
                margin-top: 0;
            }
        }

        .big-title {
            margin: 0;
            font-size: 2.2rem;
        }

        .promo-title {
            margin-top: 0;
            font-size: 1.5rem;
        }

        p {
            font-size: 1.1rem;
        }

        button {
            font-size: 1rem;
        }

        .combo-button {
            width: 100%;
        }
    `}
`;
