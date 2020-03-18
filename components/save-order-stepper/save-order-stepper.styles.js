import styled, { css } from 'styled-components';

export const StyledSaveOrderStepper = styled.aside`
    ${({ theme }) => css`
        overflow-x: hidden;
        .stepper-header {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            width: 100%;
            .circle {
                border-radius: 50%;
                background-color: ${theme.gray.terciary};
                border: 2px solid ${theme.gray.primary};
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 20px;
                width: 20px;
                height: 20px;
                cursor: pointer;
                transition: .3s;
                color: ${theme.gray.primary};

                &.active {
                    background-color: ${theme.green.primary};
                    border-color: ${theme.green.primary};
                    color: #fff;
                }
            }
            .line {
                height: 2px;
                width: 200px;
                background-color: ${theme.gray.primary};
                > div {
                    transition: .3s;
                    width: 0;
                    height: 100%;
                }
                .next-step-animation-line {
                    width: 100%;
                    background-color: ${theme.green.primary};
                }
            }
        }
    `}
`;
