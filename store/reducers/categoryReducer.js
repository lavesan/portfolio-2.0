const initialState = {
    categories: [],
    category: { id: -1, name: '' },
};

export const categoryReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_CATEGORIES() {
            return {
                ...state,
            }
        }        
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};