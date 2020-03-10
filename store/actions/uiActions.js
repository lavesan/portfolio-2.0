const SCREEN_RESIZE = 'SCREEN_RESIZE';

export const screenResize = (width) => ({
    type: SCREEN_RESIZE,
    screenWidth: width
})