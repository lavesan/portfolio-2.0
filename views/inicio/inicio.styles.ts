import styled, { css } from 'styled-components';

export const StyledInicioPage = styled.section`
    ${({ theme }) => css`
        > :not(hr) {
            padding: 35px;
        }

        > hr {
            width: 93%;
            margin: 0 auto;
        }

        .introduction-section {
            display: flex;
            flex-flow: row nowrap;

            .introduction-section--img-container {
                border-radius: 50%;
                width: 200px;
                height: 200px;
                overflow: hidden;
                margin-right: 30px;

                img {
                    width: inherit;
                }
            }
        }

        .introduction-section--info {
            margin: auto 0;

            h1 {
                font-size: 2.5rem;
                margin: 0;
            }
            p {
                font-size: 1.2rem;
            }

            .introduction-section--info--name {
                margin-bottom: 0;
            }
        }
    `}
`;
