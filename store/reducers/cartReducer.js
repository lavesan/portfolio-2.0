const initialState = {
    products: [],
};
export const cartReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    // const handleReducer = {
    //     ADD_PRODUCT() {
    //         return {
    //             ...state,
    //             products: state.products.push(action.product),
    //         }
    //     },
    //     REMOVE_PRODUCT() {
    //         const prodIndex = state.products.find(({ id }) => id === action.id);
    //         const arrAe = [];

    //         return {
    //             ...state,
    //             products: arrAe,
    //         }
    //     },
    // }

    // return handleReducer[action.type] ?
    //     handleReducer[action.type]() :
    //     state;
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
            };
        case 'REMOVE_PRODUCT':
            return {
                ...state,
            };
        default:
            return state;
    }
};