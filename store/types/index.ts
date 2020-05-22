import { IProject } from "../../components/slide-show/slide-show.interfaces";

export interface IReduxStates {
    modalState: {
        showProjectModal: boolean;
        selectedProject: IProject | null;
    };
}