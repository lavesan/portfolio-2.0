const TOGGLE_RESPONSIVE_MENU = 'TOGGLE_RESPONSIVE_MENU';
const TOGGLE_RESPONSIVE_OPEN_CART = 'TOGGLE_RESPONSIVE_OPEN_CART';

export const toggleResponsiveMenu = () => ({
    type: TOGGLE_RESPONSIVE_MENU,
})

export const toggleResponsiveOpenresponsiveCart = openResponsiveCart => ({
    type: TOGGLE_RESPONSIVE_OPEN_CART,
    openResponsiveCart,
})
