const initialState = {
    products: [
        {
            id: 1,
            name: 'Laranja Lima',
            quantity: 2,
            imgUrl: 'https://www.mambo.com.br/ccstore/v1/images/?source=/file/v2168637593948128623/products/131543.jpg&height=400&width=400',
            actualValueCents: '2000',
            quantitySuffix: 'kg',
        },
        {
            id: 2,
            name: 'Abacate',
            quantity: 2,
            imgUrl: 'https://www.mambo.com.br/ccstore/v1/images/?source=/file/v2168637593948128623/products/131543.jpg&height=400&width=400',
            actualValueCents: '2000',
            quantitySuffix: 'kg',
        },
        {
            id: 3,
            name: 'Sei lá vei',
            quantity: 2,
            imgUrl: 'https://www.mambo.com.br/ccstore/v1/images/?source=/file/v2168637593948128623/products/131543.jpg&height=400&width=400',
            actualValueCents: '2000',
            quantitySuffix: 'kg',
        },
        {
            id: 4,
            name: 'Laranja Lima',
            quantity: 2,
            imgUrl: 'https://www.mambo.com.br/ccstore/v1/images/?source=/file/v2168637593948128623/products/131543.jpg&height=400&width=400',
            actualValueCents: '2000',
            quantitySuffix: 'kg',
        },
    ],
};
export const cartReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        ADD_PRODUCT() {
            return {
                ...state,
                products: state.products.push(action.product),
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
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};