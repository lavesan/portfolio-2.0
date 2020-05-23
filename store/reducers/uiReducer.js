const initialState = {
    smoothScroll: true,
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
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};