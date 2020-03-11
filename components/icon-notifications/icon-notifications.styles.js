import styled, { css } from 'styled-components';

export const StyledIconNotification = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        height: 15px;
        width: 15px;
        font-size: .6rem;
        background-color: ${theme.green.primary};
        color: ${theme.green.secondary};
        position: absolute;
    `}
`;
