import styled from 'styled-components';

export const StyledContactSection = styled.div`
    box-sizing: border-box;
    font-size: 1.2rem;

    * {
        box-sizing: border-box;
    }

    .description {
        text-align: center;
    }
    .second-description {
        margin-top: 0;
    }
    .contact-container {
        display: flex;
        justify-content: center;
        flex-flow: row nowrap;

        > * {
            width: 100px;

            &:not(:last-child) {
                margin-right: 20px;
            }
        }
    }
`;
