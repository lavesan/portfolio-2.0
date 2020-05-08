import styled, { css } from 'styled-components';

export const StyledInicioPage = styled.section`
    ${({ theme }) => css`
        > :not(hr) {
            padding: 35px;
        }

        h2 {
            font-size: 1.9rem;
            margin: 0;
        }

        .titles-container {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }

        /* > hr {
            width: 93%;
            margin: 0 auto;
        } */

        .introduction-section {
            display: flex;
            flex-flow: row nowrap;
            height: 100vh;
            background-color: ${theme.black.secondary};
            color: ${theme.white.primary};
            box-sizing: border-box;
            font-family: 'Lora', serif;

            .introduction-section--info--buttons-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 50%;
                margin: 0 auto;
                margin-top: 40px;
            }
        }

        .introduction-section--info {
            margin: auto 0;
            width: 100%;

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

        .about-section {

            .about-section--info-container {
                display: flex;
                flex-flow: row nowrap;

                .about-section--info-container--img-container {
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

        }

        .contact-section {
            background-color: ${theme.black.secondary};
            color: ${theme.white.primary};

            .contact-container {
                display: flex;
                justify-content: space-between;
                flex-flow: row nowrap;

                > * {
                    width: 28%;
                }
            }
        }

        .submit-button {
            cursor: pointer;
            outline: none;
            padding: 10px 20px;
            border: 2px solid ${theme.green.primary};
            border-radius: 5px;
            background-color: transparent;
            color: ${theme.green.primary};
            font-size: 1.2rem;
            transition: .4s;

            :hover {
                color: ${theme.black.secondary};
                background-color: ${theme.green.primary};
            }
        }
    `}
`;

export const StyledUnderbarTitle = styled.div<any>`
    ${({ theme, width }) => css`
        height: 5px;
        width: ${width * 0.8}px;
        background-color: ${theme.green.primary};
        margin: 10px 0 20px 0;
    `}
`;