import styled from 'styled-components';

export const StyledRegisterForm = styled.form`
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
            color: ${({ theme }) => theme.green.terciary};
        }

        > :not(h2) {
            width: 70%;
        }

        > * {
            margin-bottom: 30px;
        }
    }

    /* .credentials-form {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .personal-form {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    } */


`;
