const initialState = {
    activeOrders: [],
    ordersData: [],
    responsiveStep: 1,
    selectedOrderId: '',
    orderId: '',
    selectedOrder: {
        quantitySuffix: '',
        totalValueCents: '',
        address: {
            cep: '',
            district: '',
            address: '',
            number: '',
            complement: '',
        },
        combos: [],
        products: [],
    },
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
    freeTimes: [],
    scheduleStep: {
        date: '',
        time: '',
    },
    cardStep: {
        id: '',
        brand: '',
        paymentType: 1,
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
    commentStep: {
        description: '',
    },
    addressValidations: {},
    scheduleValidations: {
        time: {
            invalid: true,
        },
        date: {
            invalid: true,
        },
    },
    cardValidations: {},
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
        SET_ORDER_VALIDATIONS() {
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    ...action.formValidations,
                }
            }
        },
        SET_ACTIVE_ORDERS_IDS() {
            return {
                ...state,
                activeOrders: action.activeOrders,
            }
        },
        SET_ORDERS_DATA() {
            return {
                ...state,
                ordersData: action.ordersData ? action.ordersData : [],
            }
        },
        CLEAR_ORDER_FORM() {

            const addressStep = {};
            Object.keys(state.addressStep)
                .map(key => {
                    if (key === 'saveAddress') {
                        addressStep[key] = false;
                    } else {
                        addressStep[key] = '';
                    }
                })
            const scheduleStep = {
                date: state.scheduleStep.date,
                time: '',
            };
            const cardStep = {};
            Object.keys(state.cardStep)
                .map(key => {
                    if (key === 'payLatter' || key == 'saveCard') {
                        addressStep[key] = false;
                    } else if (key === 'paymentType' || key == 'paymentoMethod') {
                        addressStep[key] = state.addressStep[key];
                    } else {
                        addressStep[key] = '';
                    }
                })

            return {
                ...state,
                addressStep,
                scheduleStep,
                cardStep,
            }
        },
        MOVE_RESPONSIVE_STEP() {

            const goBack = state.responsiveStep === 1 && !action.plus ? state.responsiveStep : state.responsiveStep - 1;

            return {
                ...state,
                responsiveStep: action.plus ? state.responsiveStep + 1 : goBack,
            }
        },
        SET_RESPONSIVE_STEP() {
            return {
                ...state,
                responsiveStep: action.responsiveStep,
            }
        },
        SET_ORDER_ID() {
            return {
                ...state,
                orderId: action.orderId,
            }
        },
        SET_SELECTED_ORDER() {
            return {
                ...state,
                selectedOrder: action.selectedOrder,
            }
        },
        SET_SELECTED_ORDER_ID() {
            return {
                ...state,
                selectedOrderId: action.selectedOrderId,
            }
        },
        SET_FREE_TIMES() {
            return {
                ...state,
                freeTimes: action.freeTimes,
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;

};