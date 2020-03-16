import styled from 'styled-components';

export const StyledResponsiveProductCart = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-gap: 10px;
    color: #fff;
    flex: 1;

    p {
        margin: 0;
    }

    .image-container {
        border-radius: 5px;
        overflow: hidden;
        img {
            width: 70px;
        }
    }

    .info-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;

        .quantity-text {
            margin-top: 5px;
            font-size: .8rem;
            font-weight: 300;
        }
    }

    .value-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-end;

        .value-text {
            margin-bottom: 5px;
            font-size: .8rem;
            font-weight: 300;
        }
    }

`;
