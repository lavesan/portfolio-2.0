const SET_STEP_VALUES = 'SET_STEP_VALUES';
const SET_STEP = 'SET_STEP';
const SUM_STEP = 'SUM_STEP';

export const setUserStepValues = ({ name, value }) => ({
    type: SET_STEP_VALUES,
    step: 'userStep',
    value,
    name,
});

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

export const setStep = (activeStep) => ({
    type: SET_STEP,
    activeStep,
});

export const sumStep = next => ({
    type: SUM_STEP,
    next,
})
