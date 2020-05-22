import styled from 'styled-components';

export const StyledContactSection = styled.div`
    min-height: 100vh;
    box-sizing: border-box;

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
