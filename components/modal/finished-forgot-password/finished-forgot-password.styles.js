import styled, { css } from 'styled-components';

export const StyledFinishedForgotPassword = styled.section`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 23px 20px 20px 20px;

        h2 {
            color: ${theme.green.terciary};
            font-size: 1.8rem;
            margin: 20px 0;
        }

        img {
            width: 80px;
            margin: 14px 0;
        }

        p {
            font-size: 1.3rem;
            color: ${theme.green.terciary};
            margin: 0 0 40px 0;
        }
    `}
`;
