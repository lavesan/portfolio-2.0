export interface IProjectCard {
    id: number,
    name: string,
    description: string,
    tools: string[],
    url: string,
    imgs: string[];
    selected: boolean;
    onTouchStart: VoidFunction;
}

export interface IStyledProjectCard {
    imgUrl: any;
    selected: boolean;
}
