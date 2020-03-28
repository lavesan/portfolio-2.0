const initialState = {
    promotionalProducts: [],
    categoryProducts: [],
    promotions: [
        {
            id: 0,
            loadingPromotions: true,
        },
    ],
    productFilters: [],
    filteredProducts: [],
    combos: [],
    inputField: '',
    openFilter: false,
    selectedFilters: {
        price: {
            active: false,
            field: 'pro_actual_value',
            type: 'lessThanOrEqual',
            value: 2,
        },
        quantityOnStock: {
            active: false,
            field: 'pro_quantity_on_stock',
            type: 'lessThanOrEqual',
            value: 3,
        },
    },
};

export const productReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_FILTERED_PRODUCTS() {
            return {
                ...state,
                filteredProducts: action.filteredProducts || [],
            }
        },
        SET_INPUT_SEARCH_FIELD() {
            return {
                ...state,
                inputField: action.value,
            }
        },
        SET_PRODUCT_FILTERS() {

            const stateEntries = Object.entries(state.productFilters);

            stateEntries.forEach(([key, value]) => {

                if (!action.productFilters[key]) {
                    action.productFilters[key] = value;
                }

            })

            console.log('action.productFilters: ', action.productFilters);

            const newFilter = action.productFilters.filter(filter => filter.value);

            console.log('newFilter: ', newFilter);

            return {
                ...state,
                productFilters: newFilter || [],
            }

        },
        REMOVE_PRODUCT_FILTER() {
            return {
                ...state,
                productFilters: state.productFilters.filter(filter => filter.id !== action.id)
            }
        },
        SET_SELECTED_FILTER() {
            return {
                ...state,
                selectedFilters: {
                    ...state.selectedFilters,
                    [action.name]: {
                        ...state.selectedFilters[action.name],
                        active: action.active,
                        type: action.compare,
                        id: action.id,
                        label: action.label,
                    }
                },
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
        SET_PROMOTIONS() {
            return {
                ...state,
                promotions: action.promotions,
            }
        },
        SET_COMBOS() {
            return {
                ...state,
                combos: action.combos,
            }
        },
        TOOGLE_PRODUCT_FILTER() {
            return {
                ...state,
                openFilter: !state.openFilter,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};