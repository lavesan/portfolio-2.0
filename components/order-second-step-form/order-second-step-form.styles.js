import styled from 'styled-components';

export const StyledOrderSecondStepForm = styled.form`
    display: flex;
    flex-flow: column nowrap;

    .first-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 55%;
        }
        .second-column {
            width: 30%;
        }
        > * {
            padding: 10px 5px;
        }
    }
    .second-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 70%;
        }
        .second-column {
            width: 30%;
        }
        > * {
            padding: 10px 5px;
        }
    }
`;
