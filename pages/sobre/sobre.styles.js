import styled, { css } from 'styled-components';

export const StyledAboutPage = styled.section`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;

        .about-info-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 45px;

            .images-container {
                display: flex;
                flex-flow: column nowrap;
                padding-right: 35px;

                img {
                    width: 100%;
                    max-height: 200px;
                }

                .small-images {
                    margin-top: 10px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 10px;

                    > * {
                        min-width: 0;
                    }
                }
            }

            .text-container {
                padding-left: 35px;

                h1 {
                    margin: 20px 0 40px 0;
                    font-size: 1.5rem;
                    color: ${theme.green.terciary};
                }
            }
        }

        .comments-title {
            margin: 40px 0;
            text-align: center;
            color: ${theme.green.secondary};
        }

        .comments-container {
            /* display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 30px; */
            margin-bottom: 60px;

            > * {
                padding-right: 20px;
            }
        }
    `}
`;
