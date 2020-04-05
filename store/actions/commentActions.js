const SET_COMMENTS = 'SET_COMMENTS';
const SET_COMMENT_FORM_VALUE = 'SET_COMMENT_FORM_VALUE';
const SET_COMMENT_FORM_VALIDATIONS = 'SET_COMMENT_FORM_VALIDATIONS';

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});

export const setCommentFormValue = (name, value) => ({
    type: SET_COMMENT_FORM_VALUE,
    value,
    name,
})

export const setCommentFormValidations = formValidations => ({
    type: SET_COMMENT_FORM_VALIDATIONS,
    formValidations,
})
