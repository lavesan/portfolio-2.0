import styled, { css } from 'styled-components';

export const StyledResponsiveSearchInput = styled.input`
    ${({ theme }) => css`
        flex: 1;
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
        width: 100%;
        display: flex;
        flex-flow: row nowrap;

        .search-icon {
            position: absolute;
            top: 12px;
            left: 12px;
            font-size: 1.1rem;
            color: ${theme.green.secondary};
        }

        .search-button {
            background-color: ${theme.green.terciary};
            padding: 7px 20px;
            border-radius: 5px;
            color: #fff;
            border: none;
            position: absolute;
            right: 7px;
            top: 7px;
        }
    `}
`;
