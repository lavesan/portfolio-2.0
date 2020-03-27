const SET_STEP_VALUES = 'SET_STEP_VALUES';
const SET_ACTIVE_ORDERS = 'SET_ACTIVE_ORDERS';
const ADD_ACTIVE_ORDER = 'ADD_ACTIVE_ORDER';
const REMOVE_ACTIVE_ORDER = 'REMOVE_ACTIVE_ORDER';
const SET_ORDER_VALIDATIONS = 'SET_ORDER_VALIDATIONS';
const SET_ALL_STEP_VALUES = 'SET_ALL_STEP_VALUES';
const CLEAR_STEP_VALUES = 'CLEAR_STEP_VALUES';

export const setCardStepValues = ({ name, value }) => ({
    type: SET_STEP_VALUES,
    step: 'cardStep',
    value,
    name,
});

export const setAddressStepValues = ({ name, value }) => ({
    type: SET_STEP_VALUES,
    step: 'addressStep',
    value,
    name,
});

export const setScheduleStepValues = ({ name, value }) => ({
    type: SET_STEP_VALUES,
    step: 'scheduleStep',
    value,
    name,
});

export const setActiveOrders = (activeOrders) => ({
    type: SET_ACTIVE_ORDERS,
    activeOrders,
});

export const addActiveOrder = (activeOrder) => ({
    type: ADD_ACTIVE_ORDER,
    activeOrder,
});

export const removeActiveOrder = (orderId) => ({
    type: REMOVE_ACTIVE_ORDER,
    orderId,
});

export const setAddressValidation = (formValidations) => ({
    type: SET_ORDER_VALIDATIONS,
    formName: 'addressValidations',
    formValidations,
})

export const setScheduleValidation = (formValidations) => ({
    type: SET_ORDER_VALIDATIONS,
    formName: 'scheduleValidations',
    formValidations,
})

export const setCardValidation = (formValidations) => ({
    type: SET_ORDER_VALIDATIONS,
    formName: 'cardValidations',
    formValidations,
})

export const setAllAddressStepValues = (values) => ({
    type: SET_ALL_STEP_VALUES,
    step: 'addressStep',
    values,
})

export const setAllCardStepValues = (values) => ({
    type: SET_ALL_STEP_VALUES,
    step: 'cardStep',
    values,
})

export const clearAddressStepValues = () => ({
    type: CLEAR_STEP_VALUES,
    step: 'addressStep',
})

export const clearCardStepValues = () => ({
    type: CLEAR_STEP_VALUES,
    step: 'cardStep',
})
