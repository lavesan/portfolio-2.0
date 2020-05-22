import { IProject } from "../../components/slide-show/slide-show.interfaces";

const TOOGLE_PROJECT_MODAL = 'TOOGLE_PROJECT_MODAL';

export const toggleProjectModal = (selectedProject?: IProject) => {

    console.log('selectedProject: ', selectedProject);
    return ({
        type: TOOGLE_PROJECT_MODAL,
        selectedProject,
    });
}