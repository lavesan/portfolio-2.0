import { CategoryService } from '../../services/category.service';
const categoryService = new CategoryService();

const initialState = {
    categories: [],
    category: { id: -1, name: '' },
};

export const categoryReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    // const handleReducer = {
    //     ADD_PRODUCT() {
    //         return {
    //             ...state,
    //             products: state.products.push(action.product),
    //         }
    //     },
    //     REMOVE_PRODUCT() {
    //         const prodIndex = state.products.find(({ id }) => id === action.id);
    //         const arrAe = [];

    //         return {
    //             ...state,
    //             products: arrAe,
    //         }
    //     },
    // }

    // return handleReducer[action.type] ?
    //     handleReducer[action.type]() :
    //     state;
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                category: action.category,
            };
        case 'SET_CATEGORY_FILTER':
            return {
                ...state,
                category: action.category,
            };
        default:
            return state;
    }
};