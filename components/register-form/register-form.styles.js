import styled, { css } from 'styled-components';

export const StyledRegisterForm = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        margin-top: 50px;

        > * {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;

            h2 {
                margin: 0;
                font-size: 1.3rem;
                color: ${theme.green.terciary};
            }

            .section-description {
                margin: 0;
                font-size: .8rem;
            }

            > :not(h2) {
                width: 80%;
            }

            .section-title-container {
                height: 70px;
            }
        }

        .credentials-form {
            width: 30%;
        }

        .info-form {
            width: 25%;
        }

        .address-form {
            width: 45%;
        }

        .contract-term-label {
            font-size: .7rem;
        }

        .w-60 {
            width: 60%;
        }
        .w-30 {
            width: 20%;
        }

        .row {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            > :not(:last-child) {
                margin-right: 10px;
            }
        }

        .contract-term-link {
            cursor: pointer;
            text-decoration: underline ${theme.gray.secondary};
        }
    `}
`;
