import styled, { css } from 'styled-components';

export const StyledAcessForm = styled.div`
    ${({ theme }) => css`
        .contract-term-label {
            font-size: .7rem;
            
            .contract-term-link {
                cursor: pointer;
                text-decoration: underline ${theme.gray.secondary};
            }
        }
    `}
`;
