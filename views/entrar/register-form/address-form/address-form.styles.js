import styled, { css } from 'styled-components';

export const StyledAddressForm = styled.div`
    .w-60 {
        width: 60%;
    }
    .w-30 {
        width: 20%;
    }
    .w-50 {
        width: 50%;
    }
    .w-80 {
        width: 80%;
    }

    .search-button-container {
        button {
            width: 100%;
        }
        ${({ isResponsive }) => isResponsive
            ? css`
                height: 85px;
                button {
                    padding: 19px 0px;
                }
                `
            : css`
                height: 50px;
                button {
                    padding: 10px 0;
                }
            `
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
`;
