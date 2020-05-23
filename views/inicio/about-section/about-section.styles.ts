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
    `}
`;
