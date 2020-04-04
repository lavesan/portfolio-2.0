import styled, { css } from 'styled-components';

export const StyledSaveOrderForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    color: ${({ theme }) => theme.gray.secondary};
    scroll-behavior: smooth;

    .action-button-row {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .responsive-form {
        padding: 0 20px;
        position: relative;
    }

    .responsive-success-button {
        width: 100%;
        border-radius: 0;
        text-align: center;
        padding: 20px 0;
        font-size: 1rem;
        margin-bottom: 0 !important;
    }
`;

export const StyledOrderFormTitle = styled.h2`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        font-size: 1.3rem;
        margin: 10px 0;
    `}
`;
