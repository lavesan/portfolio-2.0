const initialState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : 0,
    screenHeight: typeof window === 'object' ? window.innerHeight : 0,
};

export const uiReducer = (state = initialState, action) => {
    const handleReducer = {
        SCREEN_RESIZE() {
            return {
                ...state,
                screenWidth: action.screenWidth,
                screenHeight: action.screenHeight,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
}