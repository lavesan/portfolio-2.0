import styled from 'styled-components';

export const StyledSearchInput = styled.div`
    position: relative;

    .search-icon {
        position: absolute;
        top: 5px;
        left: 5px;
    }

    .search-input, .search-button {
        padding: 8px;
        border: thin solid #aaa;
        background: none;
    }

    .search-input {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        padding-left: 20px;
    }

    .search-button {
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;
