const initialState = {
    addressStep: {
        id: '',
        cep: '',
        district: '',
        address: '',
        number: '',
        complement: '',
        saveAddress: false,
        phoneNumber: '',
        userName: '',
    },
    scheduleStep: {
        date: '',
        time: '',
    },
    cardStep: {
        id: '',
        paymentType: { label: 'Vou sim', value: 1 },
        legalDocument: '',
        cvv: '',
        fullname: '',
        number: '',
        dueDate: '',
        changeValueCents: '',
        paymentoMethod: 0,
        payLatter: false,
        saveCard: false,
    },
    addressValidations: {},
    scheduleValidations: {},
    cardValidations: {},
    activeOrders: [],
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
        SET_MANY_VALUES_ADDRESS() {
            return {
                ...state,
                addressStep: {
                    ...state.addressStep,
                    address: action.address,
                    complement: action.complement,
                    district: action.district,
                }
            }
        },
        SET_ALL_STEP_VALUES() {
            return {
                ...state,
                [action.step]: {
                    ...state[action.step],
                    ...action.values   
                }
            }
        },
        CLEAR_STEP_VALUES() {

            const values = {};

            Object.entries(state[action.step]).forEach(([key, value]) => {
                if (key === 'saveAddress' || key === 'saveCard' || key === 'payLatter') {
                    values[key] = value;
                } else {
                    values[key] = '';
                }
            });

            return {
                ...state,
                [action.step]: values,
            }

        },
        SET_ACTIVE_ORDERS() {
            return {
                ...state,
                activeOrders: action.activeOrders,
            }
        },
        ADD_ACTIVE_ORDER() {
            return {
                ...state,
                activeOrders: [
                    ...state.activeOrders,
                    action.activeOrder,
                ],
            }
        },
        REMOVE_ACTIVE_ORDER() {
            return {
                ...state,
                activeOrders: state.activeOrders.filter(order => order.id !== action.orderId)
            }
        },
        SET_ORDER_VALIDATIONS() {
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    ...action.formValidations,
                }
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;

};