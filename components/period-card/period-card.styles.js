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
        background-position: center;
        background-size: cover;
        font-family: BobbyJonesSoft, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

        .promo-paragraph {
            margin-bottom: 27px;
        }

        h2 {
            font-family: BobbyJonesSoft, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 300;
        }

        button {
            font-size: 1rem;
        }

        .combo-button {
            width: 100%;
        }
    `}
`;
