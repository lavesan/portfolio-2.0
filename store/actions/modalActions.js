const TOGGLE_ADDRESS_MODAL = 'TOGGLE_ADDRESS_MODAL';
const TOGGLE_PRODUCT_MODAL = 'TOGGLE_PRODUCT_MODAL';
const TOGGLE_TERME_OF_CONTRACT_MODAL = 'TOGGLE_TERME_OF_CONTRACT_MODAL';
const TOGGLE_ORDER_TO_FINISH_MODAL = 'TOGGLE_ORDER_TO_FINISH_MODAL';
const TOGGLE_ORDER_FINISHED_MODAL = 'TOGGLE_ORDER_FINISHED_MODAL';
const TOOGLE_ADD_ORDER_COMMENT_MODAL = 'TOOGLE_ADD_ORDER_COMMENT_MODAL';
const TOOGLE_FORGOT_PASSWORD_MODAL = 'TOOGLE_FORGOT_PASSWORD_MODAL';
const TOOGLE_FORGOT_PASSWORD_SUCCESS_MODAL = 'TOOGLE_FORGOT_PASSWORD_SUCCESS_MODAL';

export const toggleAddressModal = () => ({
    type: TOGGLE_ADDRESS_MODAL,
});

export const toggleProductModal = (product) => ({
    type: TOGGLE_PRODUCT_MODAL,
    product,
});

export const toggleTermOfContractModal = () => ({
    type: TOGGLE_TERME_OF_CONTRACT_MODAL,
});

export const toogleOrderToFinishModal = (orderData) => ({
    type: TOGGLE_ORDER_TO_FINISH_MODAL,
    orderData,
})

export const toogleOrderFinishedModal = () => ({
    type: TOGGLE_ORDER_FINISHED_MODAL,
})

export const toogleAddOrderCommentModal = () => ({
    type: TOOGLE_ADD_ORDER_COMMENT_MODAL,
})

export const toogleForgotPasswordModal = () => ({
    type: TOOGLE_FORGOT_PASSWORD_MODAL,
})

export const toogleForgotPasswordSuccessModal = () => ({
    type: TOOGLE_FORGOT_PASSWORD_SUCCESS_MODAL,
})
