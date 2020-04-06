const SET_STEP_VALUES = 'SET_STEP_VALUES';
const SET_ORDER_VALIDATIONS = 'SET_ORDER_VALIDATIONS';
const SET_ALL_STEP_VALUES = 'SET_ALL_STEP_VALUES';
const CLEAR_STEP_VALUES = 'CLEAR_STEP_VALUES';
const SET_MANY_VALUES_ADDRESS = 'SET_MANY_VALUES_ADDRESS';
const SET_ACTIVE_ORDERS_IDS = 'SET_ACTIVE_ORDERS_IDS';
const SET_ORDERS_DATA = 'SET_ORDERS_DATA';
const CLEAR_ORDER_FORM = 'CLEAR_ORDER_FORM';
const MOVE_RESPONSIVE_STEP = 'MOVE_RESPONSIVE_STEP';
const SET_RESPONSIVE_STEP = 'SET_RESPONSIVE_STEP';
const SET_ORDER_ID = 'SET_ORDER_ID';
const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
const SET_SELECTED_ORDER_ID = 'SET_SELECTED_ORDER_ID';
const SET_FREE_TIMES = 'SET_FREE_TIMES';

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

export const setCommentStepValues = ({ name, value }) => ({
    type: SET_STEP_VALUES,
    step: 'commentStep',
    value,
    name,
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

export const setManyValuesAddress = (data) => ({
    type: SET_MANY_VALUES_ADDRESS,
    ...data,
})

export const setActiveOrders = activeOrders => ({
    type: SET_ACTIVE_ORDERS_IDS,
    activeOrders,
})

export const setOrdersData = ordersData => ({
    type: SET_ORDERS_DATA,
    ordersData,
})

export const clearOrderForm = () => ({
    type: CLEAR_ORDER_FORM,
})

export const moveResponsiveStep = plus => ({
    type: MOVE_RESPONSIVE_STEP,
    plus,
})

export const setResponsiveStep = responsiveStep => ({
    type: SET_RESPONSIVE_STEP,
    responsiveStep,
})

export const setOrderId = orderId => ({
    type: SET_ORDER_ID,
    orderId,
})

export const setSelectedOrder = selectedOrder => ({
    type: SET_SELECTED_ORDER,
    selectedOrder,
})

export const setSelectedOrderId = selectedOrderId => ({
    type: SET_SELECTED_ORDER_ID,
    selectedOrderId,
})

export const setFreeTimes = freeTimes => ({
    type: SET_FREE_TIMES,
    freeTimes,
})
