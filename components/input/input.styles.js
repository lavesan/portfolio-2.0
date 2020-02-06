import styled from 'styled-components';

export const StyledSearchInput = styled.div`
    position: relative;
    width: 100%;

    .search-icon {
        position: absolute;
        top: 8px;
        left: 8px;
        color: #aaa;
    }

    .search-input, .search-button {
        padding: 8px;
        border: thin solid #aaa;
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
        color: ${({ theme }) => theme.green.primary};
    }
`;
