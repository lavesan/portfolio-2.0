import { ISetScreenSizeParams } from '../types';

const SET_SMOOTH_SCROLL = 'SET_SMOOTH_SCROLL';
const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';

export const setSmoothScroll = (smoothScroll: boolean) => ({
    type: SET_SMOOTH_SCROLL,
    smoothScroll,
})

export const setScreenSize = ({ screenHeight, screenWidth }: ISetScreenSizeParams) => ({
    type: SET_SCREEN_SIZE,
    screenHeight,
    screenWidth,
})
