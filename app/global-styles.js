import { createGlobalStyle } from 'styled-components';
import bobbyJonesFont from '../public/static/fonts/Bobby-Jones/BobbyJonesSoft.otf';

export default createGlobalStyle`
    
    @font-face {
        font-family: 'BobbyJonesSoft';
        src: url(${bobbyJonesFont});
    }
    
    .styles_modal__gNwvD {
        border-radius: 5px;
    }

    .styles_closeButton__20ID4 {
        display: none;
    }

`
