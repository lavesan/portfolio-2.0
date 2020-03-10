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
