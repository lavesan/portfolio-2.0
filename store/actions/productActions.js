const SET_PROMOTIONAL_PRODUCTS = 'SET_PROMOTIONAL_PRODUCTS';
const SET_CATEGORY_PRODUCTS = 'SET_CATEGORY_PRODUCTS';
const ADD_CATEGORY_PRODUCTS = 'ADD_CATEGORY_PRODUCTS';
const SET_CATEGORY_PRODUCTS_PAGES = 'SET_CATEGORY_PRODUCTS_PAGES';

export const setPromotionalProducts = (promotionalProducts) => ({
    type: SET_PROMOTIONAL_PRODUCTS,
    promotionalProducts,
});

export const setCategoryProducts = (categoryProducts) => ({
    type: SET_CATEGORY_PRODUCTS,
    categoryProducts,
});

export const addCategoryProducts = ({ categoryId, products }) => ({
    type: ADD_CATEGORY_PRODUCTS,
    categoryId,
    products,
});

export const setCategoryProductsPages = ({ categoryId, plus }) => ({
    type: SET_CATEGORY_PRODUCTS_PAGES,
    categoryId,
    plus,
});
