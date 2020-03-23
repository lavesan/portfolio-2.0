import CartTypes from './cartActionTypes';

export function addProduct (product) {
    return {
        type: CartTypes.addProduct,
        product,
    };
}

export function addProducts (products) {
    return {
        type: CartTypes.addProducts,
        products,
    };
}

export function removeProduct (product) {
    return {
        type: CartTypes.removeProduct,
        product,
    };
}

export function setProduct (product) {
    return {
        type: CartTypes.setProduct,
        product,
    };
}

export function clearCart () {
    return {
        type: CartTypes.clearCart,
    };
}

export function setOrderUserForm({ fieldName, value }) {
    return {
        type: CartTypes.SET_ORDER_FORM,
        formName: 'user',
        fieldName,
        value,
    };
}

export function setOrderScheduleForm({ fieldName, value }) {
    return {
        type: CartTypes.SET_ORDER_FORM,
        formName: 'schedule',
        fieldName,
        value,
    };
}

export function setOrderCardForm({ fieldName, value }) {
    return {
        type: CartTypes.SET_ORDER_FORM,
        formName: 'card',
        fieldName,
        value,
    };
}

export function setOrderAddressForm({ fieldName, value }) {
    return {
        type: CartTypes.SET_ORDER_FORM,
        formName: 'address',
        fieldName,
        value,
    };
}
