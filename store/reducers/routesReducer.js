const initialState = {
    showHeader: true,
    showFooter: true,
    applyPageStyle: true,
};
export const routesReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_SHOW_HEADER_AND_FOOTER() {
            return {
                ...state,
                showHeader: action.showHeader,
                showFooter: action.showFooter,
                applyPageStyle: action.applyPageStyle,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};