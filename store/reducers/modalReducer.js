const initialState = {
    showProjectModal: false,
    selectedProject: null,
};

export const modalReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        TOOGLE_PROJECT_MODAL() {
            return {
                ...state,
                showProjectModal: !state.showProjectModal,
                selectedProject: action.selectedProject ? action.selectedProject : state.selectedProject,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};