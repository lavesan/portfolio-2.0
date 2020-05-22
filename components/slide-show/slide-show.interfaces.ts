export interface IProject {
    id: number;
    name: string;
    description: string;
    tools: string[];
    url: string;
    imgs: string[];
}

export interface ISlideShow {
    projects: IProject[];
    frameworks: string[];
}
