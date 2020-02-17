const initialState = {
    openAddressModal: false,
    openProductModal: false,
};
export const modalReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        TOGGLE_ADDRESS_MODAL() {
            return {
                ...state,
                openAddressModal: !state.openAddressModal,
            }
        },
        TOGGLE_PRODUCT_MODAL() {
            return {
                ...state,
                openProductModal: !state.openProductModal,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};