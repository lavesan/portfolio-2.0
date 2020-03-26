import styled, { css } from 'styled-components';

export const StyledTimeForm = styled.div`
    ${({ theme, loading }) => css`
        position: relative;
        border-radius: 5px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        ${loading && css`
            pointer-events: none;
            opacity: .7;
        `}

        > * {
            width: 30%;
            margin-bottom: 10px;
        }

        .scheduled-time-container {
            color: ${theme.gray.secondary};
            background-color: ${theme.gray.terciary};
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            height: 30px;
            border-radius: 5px;

            p {
                margin: 0;
            }

            &.active, :hover {
                color: ${theme.green.primary};
                background-color: ${theme.green.penternary};
            }

            &.inactive {
                text-decoration: line-through;
                text-decoration-color: ${theme.gray.primary};
                color: ${theme.gray.primary};
                pointer-events: none;
            }
        }

        .loading-container {
            position: absolute;
            top: 45%;
            left: 45%;
        }

    `}
`;
