const initialState = {
    products: [],
};
export const cartReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        ADD_PRODUCT() {
            return {
                ...state,
                products: state.products.push(action.product),
            }
        },
        ADD_PRODUCTS() {
            return {
                ...state,
                products: state.products.concat(action.products),
            }
        },
        REMOVE_PRODUCT() {
            const prodIndex = state.products.filter(({ id }) => id !== action.id);

            return {
                ...state,
                products: prodIndex,
            }
        },
        CLEAR_CART() {
            return {
                ...state,
                products: [],
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};