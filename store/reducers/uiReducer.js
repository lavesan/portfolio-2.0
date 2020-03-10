const initialState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : null
};

export const uiReducer = (state = initialState, action) => {
    const handleReducer = {
        SCREEN_RESIZE() {
            return {
                ...state,
                screenWidth: action.screenWidth,
            }
        }        
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
}