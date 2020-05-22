import styled, { css } from 'styled-components';

export const StyledSlideShow = styled.div`
    ${({ theme }) => css`
        .slide-show-header {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;

            .framework-button {
                cursor: pointer;
                border: thin solid transparent;
                background: none;
                outline: none;
                padding-bottom: 5px;
                color: ${theme.gray.secondary};
                transition: .5s;
                font-size: 1.2rem;

                &.framework-button--selected {
                    color: ${theme.green.primary};
                    border-bottom-color: ${theme.green.primary};
                }
            }
            .slide-show-header--divisor {
                width: 1px;
                height: 15px;
                background-color: ${theme.gray.secondary};
                margin: 0 5px;
            }
        }

        .slide-show-projects {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
    `}
`;
