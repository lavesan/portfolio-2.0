import styled, { css } from 'styled-components';

export const HeaderLayout = styled.section`
    ${({ theme }) => css`
        margin-left: 192px;

        .nav-header {
            display: flex;
            flex-flow: column nowrap;
            height: 100vh;
            width: 180px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: ${theme.white.primary};
            padding-left: 20px;
            box-shadow: 1px 1px 11px 1px ${theme.gray.primary};

            > * {
                margin-top: 30px;
            }

            .nav-header--header-link {
                text-decoration: none;
                color: ${theme.green.primary};
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.3rem;
                outline: none;
                text-align: start;

                :hover {
                    text-decoration: underline;
                    text-decoration-color: ${theme.green.primary};
                }
            }

            .nav-header--line {
                height: 20px;
                width: 2px;
                background-color: ${theme.green.primary};
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
