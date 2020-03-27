const initialState = {
    userInfo: {
        id: '',
        email: '',
        token: '',
        phones: [],
        addresses: [
            // {
            //     id: 1,
            //     address: 'Av. ayrton Senna da Silva',
            //     cep: '54410240',
            //     number: '308',
            //     district: 'Piedade',
            //     complement: 'Alguma coisa',
            // },
        ],
        cards: [
            // {
            //     lastDigits: '**** **** **** 1234',
            //     id: 2,
            //     brand: 'Master',
            // },
        ],
    },
    token: '',
    selectedForm: 'login',
    loginForm: {
        email: '',
        password: '',
    },
    accessRegisterForm: {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        termOfContract: false,
    },
    personalRegisterForm: {
        gender: 1,
        role: 0,
        age: '',
        animalsQuantity: '0',
        childrensQuantity: '0',
        description: '',
    },
    addressRegisterForm: {
        cep: '',
        address: '',
        number: '',
        district: '',
        complement: '',
        type: '',
    },
    loginFormValidations: {},
    registerFormValidations: {},
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
        SET_REGISTER_FORM_ACCESS() {
            return {
                ...state,
                accessRegisterForm: {
                    ...state.accessRegisterForm,
                    [action.name]: action.value,
                }
            }
        },
        SET_REGISTER_FORM_PERSONAL() {
            return {
                ...state,
                personalRegisterForm: {
                    ...state.personalRegisterForm,
                    [action.name]: action.value,
                }
            }
        },
        SET_REGISTER_FORM_ADDRESS() {
            return {
                ...state,
                addressRegisterForm: {
                    ...state.addressRegisterForm,
                    [action.name]: action.value,
                }
            }
        },
        SET_REGISTER_FORM_ADDRESS_MANY_VALUES() {
          return {
              ...state,
              addressRegisterForm: {
                  ...state.addressRegisterForm,
                  ...action.addressRegisterForm,
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
        SET_LOGIN_FORM_VALIDATIONS() {
            return {
                ...state,
                loginFormValidations: {
                    ...state.loginFormValidations,
                    ...action.loginFormValidations,
                },
            }
        },
        SET_REGISTER_FORM_VALIDATIONS() {
            return {
                ...state,
                registerFormValidations: {
                    ...state.registerFormValidations,
                    ...action.registerFormValidations,
                },
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