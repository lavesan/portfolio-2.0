import styled, { css } from 'styled-components';

export const StyledFinishedOrderModal = styled.section`
    ${({ theme, isResponsive }) => css`
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 23px 20px 20px 20px;

        img {
            width: 80px;
        }

        p {
            font-size: 1.3rem;
            color: ${theme.green.terciary};
            margin: 0 0 40px 0;
        }

        .return-link {
            margin: auto 0 70px 0;
            text-align: center;
            font-size: .9rem;
            color: ${theme.gray.primary};
            text-decoration-color: ${theme.gray.primary};
        }
        
        ${isResponsive && css`
            margin-top: 100px;

            img {
                width: 100px;
            }

            .see-order-button button {
                position: absolute;
                bottom: 0;
                width: 100%;
                box-sizing: border-box;
                margin: 0;
                left: 0;
                border-radius: 0;
                padding: 20px 0;
            }
        `}
    `}
`;
