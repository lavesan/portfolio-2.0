const initialState = {
    selectedForm: 'login',
    loginForm: {
        email: '',
        password: '',
    },
    registerForm: {

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
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};