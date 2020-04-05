const initialState = {
    comments: [],
    commentForm: {
        newComment: '',
    },
    commentValidations: {},
};

export const commentReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_COMMENTS() {
            return {
                ...state,
                comments: action.comments,
            }
        },
        SET_COMMENT_FORM_VALUE() {
            return {
                ...state,
                commentForm: {
                    ...state,commentForm,
                    [action.name]: action.value,
                }
            }
        },
        SET_COMMENT_FORM_VALIDATIONS() {
            return {
                ...state,
                commentValidations: {
                    ...state.commentValidations,
                    ...action.formValidations,
                }
            }
        }
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};