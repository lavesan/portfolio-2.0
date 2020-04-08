import styled, { css } from 'styled-components';

export const StyledPerfilPage = styled.section`
    ${({ theme }) => css`
        .title-container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            h1 {
                margin: 20px 0;
                font-size: 1.7rem;
            }

            .edit-button {
                border: thin solid ${theme.green.primary};
                color: ${theme.green.primary};
                font-size: 1rem;
                padding: 10px 20px;
                border-radius: 5px;
                background: none;
                cursor: pointer;
                outline: none;
                margin-left: 40px;
                white-space: nowrap;
                
                .pen-icon {
                    margin-right: 5px;   
                }
            }
            
            .logoff-button-container {
                display: flex;
                justify-content: flex-end;
                flex: 1;

                .logoff-button {
                    color: ${theme.green.terciary};
                    background-color: ${theme.green.penternary};
                    cursor: pointer;
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;

                    > :first-child {
                        margin-right: 10px;
                    }
                }
            }
        }
        .perfil-form {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            > * {
                width: 30%;
            }

            .title-paragraph {
                color: ${theme.gray.secondary};
                margin: 10px 0 5px 0;
                font-size: 1rem;
            }

            .card-button {
                cursor: pointer;
                border-radius: 5px;
                border: none;
                background-color: ${theme.gray.terciary};
                font-size: .9rem;
                padding: 10px 20px;
                outline: none;
                color: ${theme.gray.secondary};

                .remove-icon {
                    font-size: .9rem;
                    color: ${theme.danger.primary};
                }
            }

            .row {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;

                > * {
                    width: 45%;
                }
            }

            .address-1-row {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;

                > :first-child {
                    width: 60%;
                }

                > :last-child {
                    width: 30%;
                }
            }

            .buttons-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;

                > * {
                    width: 35%;
                }
                
                .cancel-button {
                    background-color: #fff;
                    color: ${theme.gray.secondary};
                    border: thin solid ${theme.gray.secondary};
                    border-radius: 5px;
                    padding: 10px 10px;
                    outline: none;
                    cursor: pointer;
                }
            }
        }

        @media(max-width: 750px) {
            .title-container .logoff-button-container {
                display: none;
            }
            .perfil-form {
                flex-direction: column;

                > * {
                    width: 100%;
                    margin-bottom: 20px;
                }
            }
        }
    `}
`
