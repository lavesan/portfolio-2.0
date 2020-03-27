import styled, { css } from 'styled-components';

export const StyledFormHorizontalCheckbox = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        margin-bottom: 20px;

        > * {
            margin-right: 30px;
        }

        .radio-input {
            color: ${theme.gray.secondary};
            font-size: .9rem;
            cursor: pointer;
            user-select: none;
            margin-top: 10px;

            p {
                margin: 0;
            }

            .bottom-check {
                height: 4px;
                width: 100%;
                border-radius: 5px;
                background-color: ${theme.gray.primary};
                overflow: hidden;
                margin-top: 5px;

                .line-to-check {
                    width: 0;
                    height: 100%;
                    background-color: ${theme.green.primary};
                    transition: width .3s;

                    &.checked-line {
                        width: 100%;
                    }
                }
            }

        }
    `}
`;
