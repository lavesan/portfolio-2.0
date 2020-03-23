const initialState = {
    products: [],
    orderForm: {
        user: {
            cpf: '',
            type: '',
        },
        schedule: {
            date: '',
            time: '',
        },
        card: {
            number: '',
            validThru: '',
            nameOnCard: '',
            cvv: '',
        },
        address: {
            id: '',
            cep: '',
            district: '',
            address: '',
            number: '',
            complement: '',
        },
    }
};
export const cartReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        ADD_PRODUCT() {
            return {
                ...state,
                products: [
                    ...state.products,
                    action.product,
                ],
            }
        },
        ADD_PRODUCTS() {
            return {
                ...state,
                products: state.products.concat(action.products),
            }
        },
        REMOVE_PRODUCT() {

            const prodIndex = state.products.filter(({ id }) => id !== action.product.id);

            return {
                ...state,
                products: prodIndex,
            }

        },
        SET_PRODUCT() {
            return {
                ...state,
                products: state.products.map(prod => {
                    
                    if (prod.id === action.product.id)
                        return {
                            ...prod,
                            ...action.product,
                        }

                    return prod;

                }),
            }
        },
        CLEAR_CART() {
            return {
                ...state,
                products: [],
            }
        },
        SET_ORDER_FORM() {
            return {
                ...state,
                orderForm: {
                    ...state.orderForm,
                    [action.formName]: {
                        ...state[action.formName],
                        [action.fieldName]: action.value,
                    }
                }
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};