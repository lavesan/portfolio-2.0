import styled from 'styled-components';

export const StyledOrderSecondStepForm = styled.section`
    display: flex;
    flex-flow: column nowrap;

    .first-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 55%;
            margin-right: 10px;
        }
        .second-column {
            width: 30%;
        }
    }
    .second-row {
        display: flex;
        flex-flow: row nowrap;
        .first-column {
            width: 70%;
            margin-right: 10px;
        }
        .second-column {
            width: 30%;
        }
    }

    .order-checkbox-label {
        color: ${({ theme }) => theme.green.terciary};
    }

    .method-type-label {
        margin-bottom: 10px;
    }

    .payment-method-radio {
        margin-bottom: 10px;
    }
`;

export const StyledCardInfoRadio = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    color: ${({ theme }) => theme.gray.secondary};

    .card-title {
        margin: 0 20px 0 0;
    }

    img {
        width: 60px;
    }
`;
