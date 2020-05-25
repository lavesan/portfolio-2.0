import { IProject } from "../../components/slide-show/slide-show.interfaces";

export interface IReduxStates {
    modalState: {
        showProjectModal: boolean;
        selectedProject: IProject | null;
    };
    uiState: {
        smoothScroll: boolean;
        screenWidth: number;
        screenHeight: number;
    };
}

export interface ISetScreenSizeParams {
    screenWidth: number;
    screenHeight: number;
}
