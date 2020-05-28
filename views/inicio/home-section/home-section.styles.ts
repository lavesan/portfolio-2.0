import styled, { css } from 'styled-components';

export const StyledHomeSection = styled.div`
    ${({ theme }) => css`
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        position: relative;

        h1 {
            font-size: 2.5rem;
            margin: 0;
        }
        p {
            margin: 0;
            font-size: 1.2rem;
        }

        > :not(div) {
            margin-left: 20px;
        }

        .introduction-section--info--buttons-container {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: 370px;
            margin: 0 auto;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .introduction-section--info--cursor {
            color: ${theme.white.primary};
            font-style: italic;
        }

        .introduction-section--info--name {
            margin-bottom: 0;
        }

        .introduction-section--info--typed-tag {
            font-size: .9rem;
            font-style: italic;
            user-select: none;
        }
        
        @media(max-width: 740px) {
            h1 {
                font-size: 2rem;
            }
        }

        @media(min-width: 630px) {
            .break-on-responsive {
                display: none;
            }
        }

        @media(max-width: 600px) {
            h1 {
                font-size: 1.4rem;
            }
        }

        @media(max-width: 430px) {
            .introduction-section--info--buttons-container {
                width: 330px;
            }
        }
    `}
`;
