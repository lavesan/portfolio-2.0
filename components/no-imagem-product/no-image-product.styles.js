import styled, { css } from 'styled-components';

export const StyledNoImageProduct = styled.div`
    ${({ theme }) => css`
        color: #fff;
        user-select: none;
        background-color: ${theme.gray.primary};
        border-radius: 5px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px;

        p {
            /* margin: 20px 0; */
            margin: 0;
            font-size: 1.1rem;
            text-align: center;
        }

        img {
            width: 63px !important;
        }
    `}
`
