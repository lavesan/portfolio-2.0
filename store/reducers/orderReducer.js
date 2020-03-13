const initialState = {
    activeStep: 1,
    userStep: {
        cpf: '',
        paymentType: 1,
    },
    cardStep: {
        cvv: '',
        fullname: '',
        number: '',
        dueDate: '',
    },
    addressStep: {
        cep: '',
        district: '',
        address: '',
        number: '',
        complement: '',
    },
};

export const orderReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_STEP_VALUES() {
            return {
                ...state,
                [action.step]: {
                    ...state[action.step],
                    [action.name]: action.value,
                }
            }
        },
        SET_STEP() {
            return {
                ...state,
                activeStep: action.activeStep,
            }
        },
        SUM_STEP() {
            return {
                ...state,
                activeStep: action.next ? state.activeStep + 1 : state.activeStep - 1,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};