import React, { Dispatch, SetStateAction } from "react";
import { Point, DiamondElement, StrokeStyle, Element, historyBlock } from "./types";
import { nanoid } from "nanoid";
import { ispointOnLine } from "./line";
import { drawdiamond } from "../drawing";
import { Tool } from "../tools";
import { generalize } from "@/app/geometry/generalize";
import { fullCopyOfElements } from "@/app/helpers/helper";

export const diamondPointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): DiamondElement => {
    return {
        id: nanoid(),
        type: "diamond",
        x: point.x,
        y: point.y,
        height: 0,
        width: 0,
        strokeColor,
        strokeWidth,
        strokeStyle,
        backgroundColor,
        opacity,
        locked: false,
        angle: 0,
    }
}

export const diamondPointerMove = (
    curruntdiamond: React.RefObject<DiamondElement | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntdiamond) return
    const diamond = curruntdiamond.current
    if (!diamond) return;
    diamond.height = diamond.y - point.y
    diamond.width = diamond.x - point.x
    drawdiamond(ctx, diamond);
}

export const diamondPointerUp = (
    curruntdiamond: React.RefObject<DiamondElement | null>,
    settool: Dispatch<SetStateAction<Tool>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    elements: Element[],
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>

) => {
    const diamond = curruntdiamond.current
    if (!diamond) return
    if (diamond.height === 0 && diamond.width === 0) {
        curruntdiamond.current = null
        return
    }
    const genralized = generalize(diamond)
    const copy = fullCopyOfElements(elements)
    copy.push(genralized)

    undoref.current.push({
        elements: copy,
        selectedElement: genralized,
        multipleSelectedElements: null,
        multipleSelectedDimentions: null
    })
    redoref.current = []


    setElements(copy)
    setSelectedElement(genralized)

    curruntdiamond.current = null
    settool("Cursor")
}


export const ispointInDiamond = (diamond: DiamondElement, point: Point) => {
    const centerX = diamond.x - diamond.width / 2;
    const centerY = diamond.y - diamond.height / 2;

    const radiusX = Math.abs(diamond.width) / 2;
    const radiusY = Math.abs(diamond.height) / 2;

    const dx = Math.abs(point.x - centerX);
    const dy = Math.abs(point.y - centerY);

    return (
        dx / radiusX +
        dy / radiusY
    ) <= 1;

}
// export const ispointInDiamond = (previousPoint: Point, point: Point, diamond: Diamond) => {

//     // ctx.moveTo((current.x + start.x) / 2, start.y)
//     // ctx.lineTo(current.x, (current.y + start.y) / 2)
//     // ctx.lineTo((current.x + start.x) / 2, current.y)
//     // ctx.lineTo(start.x, (current.y + start.y) / 2)

//     const a = { x: (diamond.current.x + diamond.start.x) / 2, y: diamond.start.y }
//     const b = { x: diamond.current.x, y: (diamond.current.y + diamond.start.y) / 2 }
//     const c = { x: (diamond.current.x + diamond.start.x) / 2, y: diamond.current.y }
//     const d = { x: diamond.start.x, y: (diamond.current.y + diamond.start.y) / 2 }

//     if (ispointOnLine(previousPoint, point, { start: a, current: b, }) ||
//         ispointOnLine(previousPoint, point, { start: b, current: c, }) ||
//         ispointOnLine(previousPoint, point, { start: c, current: d, }) ||
//         ispointOnLine(previousPoint, point, { start: d, current: a, })
//     ) {
//         return true
//     }

//     return false
// }