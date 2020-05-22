import { IProject } from '../slide-show.interfaces';

export interface IProjectCard extends IProject {
    selected: boolean;
    onTouchStart: VoidFunction;
    disappear?: boolean;
}

export interface IStyledProjectCard {
    imgUrl: any;
    selected: boolean;
    disappear?: boolean;
}
