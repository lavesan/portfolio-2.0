const initialState = {
    smoothScroll: true,
    screenWidth: 0,
    screenHeight: 0,
};

export const uiReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_SMOOTH_SCROLL() {
            return {
                ...state,
                smoothScroll: Boolean(action.smoothScroll),
            }
        },
        SET_SCREEN_SIZE() {
            return {
                ...state,
                screenWidth: action.screenWidth,
                screenHeight: action.screenHeight,
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};