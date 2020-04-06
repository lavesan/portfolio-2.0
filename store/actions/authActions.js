const SET_FORM_VALUES = 'SET_FORM_VALUES';
const CHANGE_SELECTED_FORM = 'CHANGE_SELECTED_FORM';
const SET_USER_INFO = 'SET_USER_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
const SET_REGISTER_FORM_STEP = 'SET_REGISTER_FORM_STEP';
const ADVANCE_RETURN_REGISTER_FORM_STEP = 'ADVANCE_RETURN_REGISTER_FORM_STEP';
const SET_LOGIN_FORM_VALIDATIONS = 'SET_LOGIN_FORM_VALIDATIONS';
const SET_REGISTER_FORM_ADDRESS_MANY_VALUES = 'SET_REGISTER_FORM_ADDRESS_MANY_VALUES';
const SET_REGISTER_FORM_ACCESS = 'SET_REGISTER_FORM_ACCESS';
const SET_REGISTER_FORM_PERSONAL = 'SET_REGISTER_FORM_PERSONAL';
const SET_REGISTER_FORM_ADDRESS = 'SET_REGISTER_FORM_ADDRESS';
const SET_ACCESS_VALIDATIONS = 'SET_ACCESS_VALIDATIONS';
const SET_PERSONAL_VALIDATIONS = 'SET_PERSONAL_VALIDATIONS';
const SET_ADDRESS_VALIDATIONS = 'SET_ADDRESS_VALIDATIONS';

export const setLoginFormValues = ({ name, value }) => ({
    type: SET_FORM_VALUES,
    form: 'loginForm',
    value,
    name,
})

export const setRegisterFormAccessValue = ({ name, value }) => ({
    type: SET_REGISTER_FORM_ACCESS,
    value,
    name,
})

export const setRegisterFormPersonalValue = ({ name, value }) => ({
    type: SET_REGISTER_FORM_PERSONAL,
    value,
    name,
})

export const setRegisterFormAddressValue = ({ name, value }) => ({
    type: SET_REGISTER_FORM_ADDRESS,
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
export const setUserInfo = (userInfo, token) => ({
    type: SET_USER_INFO,
    userInfo,
    token,
})

export const clearUserInfo = () => ({
    type: CLEAR_USER_INFO,
})

export const setRegisterFormStep = registerFormStep => ({
    type: SET_REGISTER_FORM_STEP,
    registerFormStep,
})

export const advanceReturnRegisterFormStep = plus => ({
    type: ADVANCE_RETURN_REGISTER_FORM_STEP,
    plus,
})

export const setAccessFormValidations = accessFormValidations => ({
    type: SET_ACCESS_VALIDATIONS,
    accessFormValidations,
})

export const setPersoanlFormValidations = personalFormValidations => ({
    type: SET_PERSONAL_VALIDATIONS,
    personalFormValidations,
})

export const setAddressFormValidations = addressFormValidations => ({
    type: SET_ADDRESS_VALIDATIONS,
    addressFormValidations,
})

export const setLoginFormValidations = loginFormValidations => ({
    type: SET_LOGIN_FORM_VALIDATIONS,
    loginFormValidations,
})

export const setRegisterFormAddressManyValues = addressRegisterForm => ({
    type: SET_REGISTER_FORM_ADDRESS_MANY_VALUES,
    addressRegisterForm,
})
