import styled, { css } from 'styled-components';

export const StyledFilterProducts = styled.section`
    ${({ theme, show }) => css`
        display: ${show ? 'flex' : 'none'};
        flex-flow: column nowrap;
        color: ${theme.gray.secondary};
        position: absolute;
        z-index: 3;
        top: 29px;
        background-color: #fff;
        border: thin solid ${theme.gray.primary};
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        color: ${theme.gray.primary};

        .title {
            font-size: 1rem;
            color: ${theme.green.terciary};
        }

        .filter-row {
            display: flex;
            flex-flow: column nowrap;

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            .filter-title {
                margin: 10px 0;
                color: ${theme.gray.secondary};
                font-weight: 600;
                font-size: .9rem;
            }

            .filter-container {
                display: flex;
                flex-flow: row nowrap;
                width: 100%;
    
                button {
                    border: thin solid ${theme.gray.primary};
                    padding: 10px 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    margin-right: 10px;
                    cursor: pointer;
                    outline: none;
    
                    &.active {
                        border-color: ${theme.green.primary};
                        color: ${theme.green.terciary};
                        background-color: ${theme.green.penternary};
                    }
                }
            }
        }

        .close-filter {
            display: flex;
            justify-content: flex-end;

            button {
                color: ${theme.gray.secondary};
                background: none;
                text-decoration: underline;
                text-decoration-color: ${theme.gray.secondary};
                border: none;
                cursor: pointer;
                outline: none;
            }
        }
    `}
`;
