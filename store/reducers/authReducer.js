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
    registerFormStep: 1,
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
        },
        SET_REGISTER_FORM_STEP() {
            return {
                ...state,
                registerFormStep: action.registerFormStep,
            }
        },
        ADVANCE_RETURN_REGISTER_FORM_STEP() {
            return {
                ...state,
                registerFormStep: action.plus ? state.registerFormStep + 1 : state.registerFormStep - 1,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};