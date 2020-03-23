import styled, { css } from 'styled-components';

export const StyledAcessForm = styled.div`
    ${({ theme, isResponsive }) => css`
        .contract-term-label {
            font-size: .7rem;
            
            .contract-term-link {
                cursor: pointer;
                text-decoration: underline ${theme.gray.secondary};
            }
        }

        .row {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            > :not(:last-child) {
                margin-right: 10px;
            }
        }

        /* ${isResponsive && css`
            > * {
                margin-bottom: 20px !important;
            }
        `} */
    `}
`;
