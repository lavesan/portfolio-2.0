const SET_FIRST_STEP_VALUES = 'SET_FIRST_STEP_VALUES';
const SET_STEP = 'SET_STEP';
const SUM_STEP = 'SUM_STEP';

export const setFirstStepValues = ({ name, value }) => ({
    type: SET_FIRST_STEP_VALUES,
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
