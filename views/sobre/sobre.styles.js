import styled, { css } from 'styled-components';

export const StyledAboutPage = styled.section`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;

        .about-info-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 45px;

            .about-us-title {
                margin: 0;
                font-size: 2rem;
                color: ${theme.green.terciary};
                margin-bottom: 10px;

                .smaller-title {
                    font-size: 1.9rem;
                }

                .about-title-line {
                    display: inline-block;
                    margin-left: 5px;
                    width: 30px;
                    height: 10px;
                    background-color: ${theme.green.terciary};
                }
            }
            
            .images-container {
                display: flex;
                flex-flow: column nowrap;
                padding-right: 35px;

                > * {
                    width: 100%;
                }

                .small-images {
                    margin-top: 10px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 10px;
                    height: 100%;

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
            margin-bottom: 60px;
            max-width: 100vw;
            box-sizing: border-box;
            
            > * {
                box-sizing: border-box;
                width: 33%;
                min-width: 33%;
                height: inherit;
                padding-right: 20px;

                > * {
                    height: 100%;
                    box-sizing: border-box;
                }
            }
        }

        @media(max-width: 880px) {
            .about-info-container {
                margin-top: 0;
                grid-template-columns: 1fr;

                .images-container {
                    padding-right: 0;

                    .big-image {
                       height: 280px;
                   }
                }

                .text-container {
                    padding-left: 0;
                }
            }
        }

        @media(max-width: 750px) {
            .comments-container {
                overflow-x: scroll;

                > * {
                   width: 50%;
                   min-width: 50%;
               }
            }
        }

        @media(max-width: 600px) {
            .comments-container > * {
                width: 100%;
                min-width: 100%;
            }
        }
    `}
`;
