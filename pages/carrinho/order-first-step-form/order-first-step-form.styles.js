import styled from 'styled-components';

export const StyledOrderFirstStep = styled.form`
    .payment-type-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;

        > * {
            min-width: 0;
        }
    }
`;
