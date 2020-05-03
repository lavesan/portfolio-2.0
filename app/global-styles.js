import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }

    body {
        overflow-x: hidden;
        max-width: 100vw;
    }
`
