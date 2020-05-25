import styled, { css } from 'styled-components';

export const StyledInicioPage = styled.section`
    ${({ theme }) => css`
        background-color: ${theme.white.primary};

        > :not(hr) {
            padding: 35px;
        }

        > hr {
            width: 95%;
            margin: 0 auto;
            border-color: ${theme.gray.primary};
        }

        .black-bg {
            background-color: ${theme.black.secondary};
            color: ${theme.white.primary};
        }

        .white-bg {
            background-color: ${theme.white.primary};
        }

        h2 {
            font-size: 1.9rem;
            margin: 0;
            white-space: nowrap;
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
            box-sizing: border-box;
            font-family: 'Lora', serif;

            .introduction-section--info--buttons-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 370px;
                margin: 0 auto;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .introduction-section--info {
            width: 100%;
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

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

        @media(max-width: 740px) {
            .introduction-section--info h1 {
                font-size: 2rem;
            }
        }

        @media(max-width: 600px) {
            .introduction-section--info h1 {
                font-size: 1.5rem;
            }
        }

        @media(max-width: 430px) {
            .introduction-section .introduction-section--info--buttons-container {
                width: 330px;
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
