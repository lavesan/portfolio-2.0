const initialState = {
    comments: [],
};

export const commentReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_COMMENTS() {
            return {
                ...state,
                comments: action.comments,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};