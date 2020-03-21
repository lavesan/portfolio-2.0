import styled, { css } from 'styled-components';

export const StyledHeader = styled.header`
    ${({ theme }) => css`
        .header-info {
            background-color: ${theme.green.terciary};
            color: #fff;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            padding: 5px 30px;
            font-size: .7rem;

            .header-info-actions {
                cursor: pointer;
                user-select: none;
            }

            > * {
                margin-right: 20px;
                > :first-child {
                    margin-right: 5px;
                }
            }
        }
        
        .header-actions {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;

            .header-acition-logo {

                img {
                    width: 100px;
                }
            }

            .header-actions-aside {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;

                .header-actions-aside-divisor {
                    background-color: ${theme.gray.primary};
                    width: 1px;
                    height: 20px;
                    margin: 0 30px;
                }
            }

            > * {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
        .header-nav {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: row nowrap;
            background-color: ${theme.green.primary};
        }

        .responsive-search-container {
            margin-top: 15px;
        }

        @media(max-width: 700px) {
            padding: 10px 20px 0 20px;

            .header-actions .header-acition-logo {
                display: flex;
                justify-content: flex-start;
            }
        }
    `}
`;