import styled, { css } from 'styled-components';

export const StyledAboutSection = styled.div`
    ${({ theme }) => css`
        .about-section--info-container {
            display: flex;
            flex-flow: row nowrap;
            margin-bottom: 20px;
            padding: 0 150px;

            .about-section--info-container--img-container {
                border-radius: 50%;
                width: 200px;
                height: 200px;
                overflow: hidden;
                margin-right: 30px;

                img {
                    width: inherit;
                }
            }

            .about-section--info-container--text-title {
                margin: 0;
                color: ${theme.green.primary};
            }
        }

        @media(max-width: 1000px) {
            .about-section--info-container {
                padding: 0 80px;
            }
        }
        @media(max-width: 850px) {
            .about-section--info-container {
                padding: 0 20px;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;

                .about-section--info-container--img-container {
                    margin-right: 0;
                    margin-bottom: 20px;
                }
            }
        }
    `}
`;
