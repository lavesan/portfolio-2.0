import styled, { css } from 'styled-components';

export const StyledSearchInput = styled.div`
    ${({ theme }) => css`
        position: relative;
        width: 100%;

        .search-icon {
            position: absolute;
            top: 8px;
            left: 8px;
            color: ${theme.gray.primary};
        }

        .search-input, .search-button {
            padding: 8px;
            border: thin solid ${theme.gray.primary};
            background: none;
            outline: none;
        }

        .search-input {
            width: 70%;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding-left: 32px;
        }

        .search-button {
            width: 20%;
            cursor: pointer;
            border-left: none;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            color: ${theme.green.secondary};
        }
    `}
`;
