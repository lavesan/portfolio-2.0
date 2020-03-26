const initialState = {
    addressStep: {
        cep: '',
        district: '',
        address: '',
        number: '',
        complement: '',
    },
    scheduleStep: {
        date: '',
        time: '',
    },
    cardStep: {
        id: '',
        paymentType: '',
        legalDocument: '',
        cvv: '',
        fullname: '',
        number: '',
        dueDate: '',
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
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};