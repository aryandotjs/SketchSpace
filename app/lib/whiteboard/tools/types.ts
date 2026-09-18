export type ElementType =
    | "freedraw"
    | "rectangle"
    | "ellipse"
    | "diamond"
    | "line"
    | "arrow"
    | "text"
    | "image"
    | "frame";

export type Point = {
    x: number,
    y: number
}

export enum StrokeStyle {
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted",
}

export enum fillStyle {
    Solid = "solid",
    Hachure = "hachure",
    CrossHatch = "CrossHatch"
}
export type BorderType = "default" | "rounded"

export type BaseElement = {
    id: string;
    type: ElementType;

    x: number;
    y: number;

    width: number;
    height: number;

    angle: number;

    strokeColor: string;
    backgroundColor: string;
    fillStyle: fillStyle,
    strokeWidth: number;
    strokeStyle: StrokeStyle;
    opacity: number;

    locked: boolean;
};


export type FreedrawElement = BaseElement & {
    type: "freedraw",
    points: Point[]
    SnapshotPoints: Point[]
}

export type RectangleElement = BaseElement & {
    type: "rectangle"
}

export type EllipseElement = BaseElement & {
    type: "ellipse"
}

export type DiamondElement = BaseElement & {
    type: "diamond"
}

export type LineElement = BaseElement & {
    type: "line",

}
export type ArrowElement = BaseElement & {
    type: "arrow",
}

export type TextElement = BaseElement & {
    type: "text",

    text: string,
    fontFamily: string,
    fontSize: number

    textAlign: "left" | "center" | "right"
    verticalAlign: "top" | "center" | "bottom"
}

export type ImageElement = BaseElement & {
    type: "image",

    fieldId: string

    status: "pending" | "loading" | "error"

    height: number,
    width: number,
}

export type FrameElement = BaseElement & {
    type: "frame",

    name: string,
    childIds: string[]
}

export type Element = RectangleElement
    | EllipseElement
    | DiamondElement
    | LineElement
    | ArrowElement
    | FreedrawElement
    | TextElement
    | ImageElement
    | FrameElement;



export type resizeEleObjType = {
    Element: Element,
    index: number | null,
    top: number,
    bottom: number,
    left: number,
    right: number,
    movement: "Still" | "Moved"
    contactPoint: "TopLeftSquare" | "TopRightSquare" | "BottomLeftSquare" | "BottomRightSquare" |
    "TopSide" | "BottomSide" | "LeftSide" | "RightSide" | "TopCircle" | "LeftCircle" | "RightCircle" | "none"
}
export type MultipleResizeEleObjType = {
    point: Point,
    dimentions: DimentionsMultipleSelectBox | null,
    snapShotdimentions: DimentionsMultipleSelectBox | null,
    ElementsAndIndex: {
        element: Element,
        index: number,
    }[] | null,
    SnapShotElements: Element[] | null,
    movement: "Still" | "Moved"
    contactPoint: "TopLeftSquare" | "TopRightSquare" | "BottomLeftSquare" | "BottomRightSquare" |
    "TopSide" | "BottomSide" | "LeftSide" | "RightSide" | "TopCircle" | "LeftCircle" | "RightCircle" | "none"
}

export type MoveEleObjType = {
    point: Point
    Element: Element,
    index: number | null,
    fromTop: number,
    fromLeft: number,
    movement: "Still" | "Moved"
}
export type MoveMultipleEleObjType = {
    point: Point
    ElementsAndIndex: {
        element: Element,
        index: number,
    }[] | null,
    DimentionBox: DimentionsMultipleSelectBox | null
    fromTop: number,
    fromLeft: number,
    movement: "Still" | "Moved"
}

export type MultipleSelectObjType = {
    top: number,
    bottom: number,
    left: number,
    right: number,
    MultipleSelectedElements: Element[] | null
    dimentionsInnerBox: DimentionsMultipleSelectBox | null
    movement: "Still" | "Moved"
}

export type DimentionsMultipleSelectBox = {
    top: number | null,
    bottom: number | null,
    left: number | null,
    right: number | null
}

export type historyBlock = {
    elements: Element[],
    selectedElement: Element | null,
    multipleSelectedElements: Element[] | null,
    multipleSelectedDimentions: DimentionsMultipleSelectBox | null
} 