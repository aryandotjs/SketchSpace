export type Point = {
    x: number;
    y: number;
};

export type Stroke = {
    id: string,

    type: "stroke";
    points: Point[];
    color: string;
    width: number;
};
export type Rectangle = {
    id: string,

    type: "rectangle";
    start: Point
    current: Point
    color: string
    width: number
};
export type Arrow = {
    id: string,

    type: "arrow";
    start: Point
    current: Point
    color: string
    width: number
};
export type Line = {
    id: string,
    type: "line";
    start: Point
    current: Point
    color: string
    width: number
};
export type LineForgeometry = {
    start: Point
    current: Point
};

export type Ellipse = {
    id: string,

    type: "ellipse";
    start: Point
    current: Point
    color: string
    width: number
};


export type Shape =
    | Stroke
    | Rectangle
    | Ellipse
    | Arrow
    | Line;

