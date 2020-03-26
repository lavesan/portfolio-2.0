import styled from 'styled-components';

export const StyledOrderAddressStepForm = styled.section`
    display: flex;
    flex-flow: column nowrap;

    > * {
        margin-bottom: 20px;
    }
    .first-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 50%;
        }
        .second-column {
            width: 50%;
        }
        > * {
            padding: 10px 5px;
        }
    }
    .second-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 65%;
        }
        .second-column {
            width: 35%;
        }
        > * {
            padding: 10px 5px;
        }
    }
`;
