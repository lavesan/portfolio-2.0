import styled, { css } from 'styled-components';

export const HeaderLayout = styled.section`
    ${({ theme }) => css`
        margin-left: 80px;

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
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                width: 100%;

                > :not(:last-child) {
                    margin-bottom: 10px;
                }

                > * {
                    display: inline-block;
                    text-align: center;
                    width: 30px;
                    color: ${theme.green.primary};
                }

                .nav-header--social-links-container--linkedin:hover {
                    color: ${theme.brands.telegram};
                }
            }
        }
        /* .nav-responsive-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: ${theme.white.primary};

            .nav-responsive-header--header-link {
                padding: 5px 10px;
                text-decoration: none;
                color: ${theme.green.primary};
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.2rem;
                margin: 0 auto;
            }

            .nav-responsive-header--line {
                height: 20px;
                width: 2px;
                background-color: ${theme.green.primary};
            }
        } */
    `}
`;
