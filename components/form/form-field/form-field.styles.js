import styled, { css } from 'styled-components';

export const StyledFieldset = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;

        label {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    `}
`;
