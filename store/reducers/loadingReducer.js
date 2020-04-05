const initialState = {
    showFullLoading: true,
};

export const loadingReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        TOOGLE_FULL_LOADING() {
            return {
                ...state,
                showFullLoading: typeof action.showFullLoading === 'boolean' ? action.showFullLoading : !state.showFullLoading,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};