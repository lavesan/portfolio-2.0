import styled, { css } from 'styled-components';

export const StyledFooter = styled.footer`
    ${({ theme }) => css`
        width: 100%;

        .footer-info {
            padding: 20px 60px;
            background-color: ${theme.green.primary};
            display: grid;
            grid-template-columns: 2fr 2fr 1fr;
            grid-gap: 20px;

            h3 {
                font-size: 1rem;
                color: ${theme.green.secondary};
            }

            p {
                font-size: .8rem;
                color: #fff;
            }

            > * {
                min-width: 0;
                display: flex;
                flex-flow: column nowrap;
            }
        }

        .footer-cards {
            padding: 10px 60px;
            background-color: ${theme.green.secondary};
            color: #fff;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
    `}
`;