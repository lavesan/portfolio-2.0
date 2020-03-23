const SET_PROMOTIONAL_PRODUCTS = 'SET_PROMOTIONAL_PRODUCTS';
const SET_CATEGORY_PRODUCTS = 'SET_CATEGORY_PRODUCTS';
const ADD_CATEGORY_PRODUCTS = 'ADD_CATEGORY_PRODUCTS';
const SET_CATEGORY_PRODUCTS_PAGES = 'SET_CATEGORY_PRODUCTS_PAGES';
const ADD_PRODUCT_FILTER = 'ADD_PRODUCT_FILTER';
const REMOVE_PRODUCT_FILTER = 'REMOVE_PRODUCT_FILTER';
const SET_PROMOTIONS = 'SET_PROMOTIONS';
const SET_COMBOS = 'SET_COMBOS';

export const setPromotionalProducts = (promotionalProducts = []) => ({
    type: SET_PROMOTIONAL_PRODUCTS,
    promotionalProducts,
});

export const setCategoryProducts = (categoryProducts = []) => ({
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

export const addCategoryProductFilter = (category) => ({
    type: ADD_PRODUCT_FILTER,
    filter: {
        type: 'equals',
        field: 'pro.category.id',
        value: category.id,
    }
})

export const addAllProductFilter = (text) => ({
    type: ADD_PRODUCT_FILTER,
    filter: {
        type: 'all',
        value: text,
    }
})

export const addProductFilter = (filter) => ({
    type: ADD_PRODUCT_FILTER,
    filter,
});

export const removeProductFilter = (index) => ({
    type: REMOVE_PRODUCT_FILTER,
    index,
});

export const setPromotions = (promotions) => ({
    type: SET_PROMOTIONS,
    promotions,
});

export const setCombos = (combos) => ({
    type: SET_COMBOS,
    combos,
});
