import styled from 'styled-components';

export const StyledAboutPage = styled.section`
    display: flex;
    flex-flow: column nowrap;

    .about-info-container {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .images-container {
            display: flex;
            flex-flow: column nowrap;
            padding-right: 35px;

            img {
                width: 100%;
                max-height: 200px;
            }

            .small-images {
                margin-top: 10px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 10px;

                > * {
                    min-width: 0;
                }
            }
        }

        .text-container {
            padding-left: 35px;
        }
    }

    .comments-title {
        text-align: center;
    }

    .comments-container {

    }
`;
