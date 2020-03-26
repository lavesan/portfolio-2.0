import styled, { css } from 'styled-components';

export const StyledSaveOrderForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    color: ${({ theme }) => theme.gray.secondary};
`;

export const StyledOrderFormTitle = styled.h2`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        font-size: 1.3rem;
        margin: 10px 0;
    `}
`;
