import styled, { css } from 'styled-components';

export const StyledFinishedOrderModal = styled.section`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 23px 20px 20px 20px;

        img {
            width: 80px;
        }

        p {
            font-size: 1.3rem;
            color: ${theme.green.terciary};
            margin: 0 0 40px 0;
        }
    `}
`;
