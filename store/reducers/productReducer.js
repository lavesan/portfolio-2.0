const initialState = {
    promotionalProducts: [],
    categoryProducts: [],
    filters: [],
};

export const productReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        ADD_PRODUCT_FILTER() {
            return {
                ...state,
                filter: [
                    ...state.filters,
                    action.filter,
                ]
            }
        },
        REMOVE_PRODUCT_FILTER() {
            return {
                ...state,
                filter: state.filters.filter((filter, index) => index !== action.index)
            }
        },
        SET_CATEGORY_PRODUCTS_PAGES() {
            return {
                ...state,
                categoryProducts: state.categoryProducts.map(data => {

                    if (data.category.id === action.categoryId) {
                        return {
                            ...data,
                            page: action.plus ? data.page + 1 : data.page - 1,
                        }
                    }
                    
                    return data;

                }),
            }
        },
        SET_PROMOTIONAL_PRODUCTS() {
            return {
                ...state,
                promotionalProducts: action.promotionalProducts,
            }
        },
        SET_CATEGORY_PRODUCTS() {
            return {
                ...state,
                categoryProducts: action.categoryProducts.map(data => ({
                    ...data,
                    page: 1,
                })),
            }
        },
        ADD_CATEGORY_PRODUCTS() {
            return {
                ...state,
                categoryProducts: state.categoryProducts.map(
                    prod => {
                        if (prod.category.id === action.categoryId) {
                            return {
                                category: prod.category,
                                products: [
                                    ...prod.products,
                                    action.products
                                ],
                            }
                        }

                        return prod;
                    }
                ),
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};