const initialState = {
    userInfo: {
        id: '',
        email: '',
        token: '',
        phones: [],
        addresses: [],
    },
    selectedForm: 'login',
    loginForm: {
        email: '',
        password: '',
    },
    registerForm: {
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        termOfContract: false,
        role: 0,
        age: '',
        animalsQuantity: '',
        childrensQuantity: '',
        description: '',
    },
};
export const authReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_FORM_VALUES() {
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.name]: action.value,
                }
            }
        },
        CHANGE_SELECTED_FORM() {
            return {
                ...state,
                selectedForm: action.selectedForm,
            }
        },
        SET_USER_INFO() {
            return {
                ...state,
                userInfo: {
                    id: action.id,
                    name: action.name,
                    email: action.email,
                    token: action.token,
                }
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};