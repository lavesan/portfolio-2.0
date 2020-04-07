import styled, { css } from 'styled-components';

export const StyledProductsRow = styled.div`
    ${({ theme }) => css`
        .products-category-header {
            display: flex;
            flex-flow: row nowrap;
            /* justify-content: space-between; */
            justify-content: space-between;
            align-items: center;
            h3 {
                margin: 0 0 10px 0;
            }
            .navigate-buttons {
        
                .navigate-left {
                    margin-right: 13px;
                }
                .disabled {
                    pointer-events: none;
                    opacity: .7;
                    cursor: default;
                }
                button {
                    ${({ theme }) => css`
                        background: none;
                        width: 25px;
                        height: 25px;
                        border: thin solid ${theme.gray.primary};
                        border-radius: 5px;
                        cursor: pointer;
                        color: ${theme.gray.secondary};
                        outline: none;
                    `}
                }
            }
        }
    `}
`;
