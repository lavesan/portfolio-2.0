const TOGGLE_ADDRESS_MODAL = 'TOGGLE_ADDRESS_MODAL';
const TOGGLE_PRODUCT_MODAL = 'TOGGLE_PRODUCT_MODAL';
const TOGGLE_TERME_OF_CONTRACT_MODAL = 'TOGGLE_TERME_OF_CONTRACT_MODAL';

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
