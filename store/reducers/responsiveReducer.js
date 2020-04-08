const initialState = {
    showResponsiveMenu: false,
    openResponsiveCart: false,
};

export const responsiveReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        TOGGLE_RESPONSIVE_MENU() {
            return {
                ...state,
                showResponsiveMenu: !state.showResponsiveMenu,
            }
        },
        TOGGLE_RESPONSIVE_OPEN_CART() {
            return {
                ...state,
                openResponsiveCart: typeof action.openResponsiveCart === 'boolean' ? action.openResponsiveCart : !state.openResponsiveCart,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};