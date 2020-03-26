const SET_STEP_VALUES = 'SET_STEP_VALUES';

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
