const initialState = {
    firstStep: {
        cpf: '',
        paymentType: '',
    },
    activeStep: 1,
};

export const orderReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_FIRST_STEP_VALUES() {
            return {
                ...state,
                firstStep: {
                    ...state.firstStep,
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