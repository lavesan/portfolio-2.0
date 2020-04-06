import { createGlobalStyle, css } from 'styled-components';
import bobbyJonesFont from '../public/static/fonts/Bobby-Jones/BobbyJonesSoft.otf';

export default createGlobalStyle`
    
    .styles_modal__gNwvD {
        border-radius: 5px;
    }

    .styles_closeButton__20ID4 {
        display: none;
    }

    @font-face {
        font-family: 'BobbyJonesSoft';
        src: url(${({ font }) => font}) format("truetype");
    }

    ${({ screenWidth }) => screenWidth < 750 &&  css`
        body {
            overflow-x: hidden;
        }
    `}

`
