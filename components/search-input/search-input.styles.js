import styled, { css } from 'styled-components';

export const StyledSearchInput = styled.div`
    ${({ theme, icon, button }) => css`
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
            border-right: none;
            background: none;
            outline: none;
        }

        .search-input {
            width: 65%;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            ${icon && 'padding-left: 32px;'}
        }

        .search-button {
            width: 20%;
            cursor: pointer;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            color: ${button.color};
            border: thin solid ${button.borderColor};
            background-color: ${button.backgroundColor};
        }
    `}
`;
