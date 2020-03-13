import styled, { css } from 'styled-components';

export const StyledResponsiveSearchInput = styled.input`
    ${({ theme }) => css`
        border-radius: 5px;
        border: thin solid ${theme.green.primary};
        background-color: ${theme.white.secondary};
        padding: 12px 20px 12px 40px;
        outline: none;
        font-size: .9rem;
        box-sizing : border-box;
        width: 100%;
        
        ::placeholder {
            color: ${theme.gray.quaternary};
        }
    `}
`;

export const StyledResponsiveSearchComponent = styled.div`
    ${({ theme }) => css`
        position: relative;
        .search-icon {
            position: absolute;
            top: 12px;
            left: 12px;
            font-size: 1.1rem;
            color: ${theme.green.secondary};
        }
    `}
`;
