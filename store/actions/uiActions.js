const SCREEN_RESIZE = 'SCREEN_RESIZE';

export const screenResize = ({ width, height }) => ({
    type: SCREEN_RESIZE,
    screenWidth: width,
    screenHeight: height,
})