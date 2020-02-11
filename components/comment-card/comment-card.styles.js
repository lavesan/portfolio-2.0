import styled, { css } from 'styled-components';

export const StyledCommentCard = styled.div`
    ${({ theme }) => css`
        border: thin solid ${theme.green.primary};
        padding: 15px;
        display: flex;
        flex-flow: column nowrap;

        .comment-text {
            color: ${theme.gray.secondary};
            font-size: .7rem;
        }

        .comment-card-footer {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-end;
            color: ${theme.green.terciary};
            font-weight: 600;
            font-size: .9rem;

            .comment-card-footer--image-container {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 65px;
                }
            }
        }
    `}
`;
