import styled, { css } from 'styled-components';

export const HeaderLayout = styled.section`
    ${({ theme }) => css`
        margin-left: 80px;

        a, button {
            outline: none;
        }

        .nav-header {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            height: 100vh;
            width: 80px;
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
            background-color: ${theme.black.primary};
            border-right: 2px solid ${theme.green.primary};
            transition: top .3s;

            > * {
                margin-top: 30px;
            }

            .nav-header--header-link {
                text-decoration: none;
                color: ${theme.green.primary};
                background: none;
                border: none;
                cursor: pointer;
                font-size: .8rem;
                outline: none;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;

                .nav-header--header-link--icon {
                    width: 25px;
                }

                .nav-header--header-link--text {
                    opacity: 0;
                    height: 0;
                    transition: .3s;
                }

                :hover .nav-header--header-link--text {
                    opacity: 1;
                    height: 10px;
                }
            }

            .nav-header--line {
                height: 20px;
                width: 2px;
                background-color: ${theme.green.primary};
            }

            .nav-header--social-links-container {
                position: absolute;
                bottom: 5px;
                left: 0;
                z-index: 3;

                > div {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                }
                width: 100%;
            }
        }

        .footer-links {
            position: fixed;
            bottom: -10px;
            right: 20px;
            display: none;
            border: 2px solid ${theme.green.primary};
            background-color: ${theme.black.primary};
            border-radius: 5px;
            padding: 5px 10px 10px 10px;
            flex-flow: column nowrap;
            align-items: center;

            > div {
                display: flex;
                flex-flow: column nowrap;
            }

            .footer-links-toogle {
                margin-bottom: 10px;
            }
        }

        @media(max-width: 850px) {
            margin-left: 0;

            .nav-header {
                flex-flow: row nowrap;
                width: 100vw;
                height: 53px;
                border-right: none;
                border-bottom: 2px solid ${theme.green.primary};
                align-items: center;

                > * {
                    margin-top: 0;
                }

                .nav-header--social-links-container {
                    display: none;
                }
            }

            .footer-links {
                display: flex;
            }

        }
    `}
`;
