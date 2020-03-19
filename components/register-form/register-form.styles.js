import styled, { css } from 'styled-components';

export const StyledRegisterForm = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        margin-top: 50px;

        > * {
            width: 33%;
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;

            h2 {
                margin-top: 0;
                font-size: 1.3rem;
                color: ${theme.green.terciary};
            }

            > :not(h2) {
                width: 80%;
            }

            > * {
                margin-bottom: 30px;
            }
        }

        .contract-term-label {
            font-size: .7rem;
        }

        .contract-term-link {
            cursor: pointer;
            text-decoration: underline ${theme.gray.secondary};
        }
    `}
`;
