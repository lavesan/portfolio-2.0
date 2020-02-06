import styled, { css } from 'styled-components';

export const StyledHeader = styled.header`
    ${({ theme }) => css`
        width: 100%;

        .header-info {
            background-color: ${theme.green.primary};
            color: #fff;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            padding: 5px 30px;
            font-size: .7rem;

            > * {
                margin-right: 20px;
                > :first-child {
                    margin-right: 5px;
                }
            }
        }
        
        .header-actions {
            img {
                width: 100px;
            }
        }
        
        .header-nav {
            background-color: ${theme.green.secondary};


        }
    `}
`;