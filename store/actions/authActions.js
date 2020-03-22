const SET_FORM_VALUES = 'SET_FORM_VALUES';
const CHANGE_SELECTED_FORM = 'CHANGE_SELECTED_FORM';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_REGISTER_FORM_STEP = 'SET_REGISTER_FORM_STEP';
const ADVANCE_RETURN_REGISTER_FORM_STEP = 'ADVANCE_RETURN_REGISTER_FORM_STEP';

export const setLoginFormValues = ({ name, value }) => ({
    type: SET_FORM_VALUES,
    form: 'loginForm',
    value,
    name,
})

export const setRegisterFormValues = ({ name, value }) => ({
    type: SET_FORM_VALUES,
    form: 'registerForm',
    value,
    name,
})

/**
 * @description Sets the selected form from the user
 * @param {{ selectedForm: 'login' | 'register' }} param0
 */
export const setSelectedForm = ({ selectedForm }) => ({
    type: CHANGE_SELECTED_FORM,
    selectedForm,
})

/**
 * @param {{ id: number, name: string, token: string, email: string }} userInfo 
 */
export const setUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    ...userInfo,
})

export const setRegisterFormStep = registerFormStep => ({
    type: SET_REGISTER_FORM_STEP,
    registerFormStep,
})

export const advanceReturnRegisterFormStep = plus => ({
    type: ADVANCE_RETURN_REGISTER_FORM_STEP,
    plus,
})
