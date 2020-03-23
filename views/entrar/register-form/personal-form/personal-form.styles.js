import styled, { css } from 'styled-components';

export const StyledPersonalForm = styled.div`
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

    .row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        > :not(:last-child) {
            margin-right: 10px;
        }
    }
    
    /* ${({ isResponsive }) => isResponsive && css`
        > * {
            margin-bottom: 20px !important;
        }
    `} */
`;
