const initialState = {
    showHeader: true,
    showFooter: true,
    applyPageStyle: true,
    showSearchInput: true,
    actualRoute: '',
};
export const routesReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_SHOW_HEADER_AND_FOOTER() {
            return {
                ...state,
                showHeader: typeof action.showHeader === 'boolean'  ? action.showHeader : state.showHeader,
                showFooter: typeof action.showFooter === 'boolean' ? action.showFooter : state.showFooter,
                applyPageStyle: typeof action.applyPageStyle === 'boolean' ? action.applyPageStyle : state.applyPageStyle,
            }
        },
        SET_ACTUAL_ROUTE() {
            return {
                ...state,
                actualRoute: action.actualRoute,
            }
        },
        SET_SHOW_SEARCH_INPUT() {
            return {
                ...state,
                showSearchInput: action.showSearchInput,
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};