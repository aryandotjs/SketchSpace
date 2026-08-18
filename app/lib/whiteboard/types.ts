export type Point = {
    x: number;
    y: number;
};

export type Stroke = {
    points: Point[];
    color: string;
    width: number;
};
export type Rectangle = {
    start: Point
    current: Point
    color: string
    width: number
};

export type Ellipse = {
    start: Point
    current: Point
    color: string
    width: number
};


