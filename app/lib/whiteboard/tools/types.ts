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
    style: stylestroke,
    opacity: number
};
export type Rectangle = {
    id: string,

    type: "rectangle";
    start: Point
    current: Point
    color: string
    width: number
    style: stylestroke,
    opacity: number

};
export type Diamond = {
    id: string,
    type: "Diamond";
    start: Point
    current: Point
    color: string
    width: number
    style: stylestroke,
    opacity: number

};
export type Arrow = {
    id: string,

    type: "arrow";
    start: Point
    current: Point
    color: string
    style: stylestroke,
    width: number,
    opacity: number
};
export type Line = {
    id: string,
    type: "line";
    start: Point
    current: Point
    color: string
    width: number,
    style: stylestroke,
    opacity: number
};
//thi sone is for the calculation line in is online thing dnt forget 
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
    style: stylestroke
    opacity: number

};


export type Shape =
    | Stroke
    | Rectangle
    | Ellipse
    | Arrow
    | Line
    | Diamond
    ;


export enum stylestroke {
    Normal = "Normal",
    Dashed = "Dashed",
    ExtraDashed = "ExtraDashed"
}