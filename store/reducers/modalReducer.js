const initialState = {
    openAddressModal: false,
    openProductModal: false,
    selectedProduct: {},
    openTermOfContractModal: false,
    openAddOrderCommentModal: false,
    openOrderToFinishModal: false,
    orderData: {
        order: {
            totalProductValueCents: '',
            totalFreightValuesCents: '',
            totalValueCents: '',
        },
        products: [],
        address: {
            address: '',
            number: '',
            cep: '',
        },
    },
    openOrderFinishedModal: false,
    openForgotPasswordModal: false,
    openForgotPassworSuccessdModal: false,
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
                selectedProduct: action.product ? action.product : state.selectedProduct,
            }
        },
        TOGGLE_TERME_OF_CONTRACT_MODAL() {
            return {
                ...state,
                openTermOfContractModal: !state.openTermOfContractModal,
            }
        },
        TOOGLE_ADD_ORDER_COMMENT_MODAL() {
            return {
                ...state,
                openAddOrderCommentModal: !state.openAddOrderCommentModal,
            }
        },
        TOGGLE_ORDER_TO_FINISH_MODAL() {
            return {
                ...state,
                openOrderToFinishModal: !state.openOrderToFinishModal,
                orderData: action.orderData ? action.orderData : state.orderData,
            }

        },
        TOGGLE_ORDER_FINISHED_MODAL() {
            return {
                ...state,
                openOrderFinishedModal: !state.openOrderFinishedModal,
            }
        },
        TOOGLE_FORGOT_PASSWORD_MODAL() {
            return {
                ...state,
                openForgotPasswordModal: !state.openForgotPasswordModal,
            }
        },
        TOOGLE_FORGOT_PASSWORD_SUCCESS_MODAL() {
            return {
                ...state,
                openForgotPassworSuccessdModal: !state.openForgotPassworSuccessdModal,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};