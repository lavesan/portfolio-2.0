import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }

    body {
        overflow-x: hidden;
        max-width: 100vw;
        color: ${({ theme }: any) => theme.gray.secondary};
        margin: 0;
    }

    .styles_modal__gNwvD {
        border-radius: 5px;
    }
`
