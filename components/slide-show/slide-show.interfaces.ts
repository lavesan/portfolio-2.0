export interface IProject {
    id: number;
    url: string;
    name: string;
    imgs: string[];
    tools: string[];
    codeUrl: string;
    description: string;
}

export interface ISlideShow {
    projects: IProject[];
    frameworks: string[];
}
