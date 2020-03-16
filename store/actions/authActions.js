const SET_FORM_VALUES = 'SET_FORM_VALUES';

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
    type: SET_FORM_VALUES,
    selectedForm,
})
