import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";
import { ArrowElement, Element, historyBlock, Point, StrokeStyle } from "./types";
import { drawArrow } from "../drawing";
import { Tool } from "../tools";
import { generalize } from "@/app/geometry/generalize";
import { fullCopyOfElements, fullCopyOfSingleElement } from "@/app/helpers/helper";



export const arrowPointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): ArrowElement => {
    return {
        id: nanoid(),
        type: "arrow",
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

export const arrowPointerMove = (
    curruntarrow: React.RefObject<ArrowElement | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntarrow) return
    const arrow = curruntarrow.current
    if (!arrow) return;
    arrow.height = arrow.y - point.y
    arrow.width = arrow.x - point.x
    drawArrow(ctx, arrow);
}

export const arrowPointerUp = (curruntarrow: React.RefObject<ArrowElement | null>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    settool: Dispatch<SetStateAction<Tool>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    elements: Element[],
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,

) => {
    if (!curruntarrow) return
    const arrow = curruntarrow.current
    if (!arrow) return
    if (arrow.height === 0 && arrow.width === 0) {
        curruntarrow.current = null
        return
    }
    const copyelement = fullCopyOfSingleElement(arrow)

    const copy = fullCopyOfElements(elements)

    copy.push(copyelement)

    undoref.current.push({
        elements: copy,
        selectedElement: copyelement,
        multipleSelectedElements: null,
        multipleSelectedDimentions: null
    })
    redoref.current = []
    setElements(copy)
    setSelectedElement(copyelement)

    curruntarrow.current = null
    settool("Cursor")
}

// export const ispointOnarrow = (a: Point, b: Point, arrow: ArrowElement) => {

//     const dx = arrow.current.x - arrow.start.x
//     const dy = arrow.current.y - arrow.start.y

//     const crossStart = dx * (arrow.start.y - a.y) - dy * (arrow.start.x - a.x)
//     const crossEnd = dx * (arrow.start.y - b.y) - dy * (arrow.start.x - b.x)

//     const didEraserCrossarrow = crossStart * crossEnd < 0

//     const ax = b.x - a.x
//     const ay = b.y - a.y

//     const crossStart2 = ax * (a.y - arrow.start.y) - ay * (a.x - arrow.start.x)
//     const crossEnd2 = ax * (a.y - arrow.current.y) - ay * (a.x - arrow.current.x)

//     const didarrowCrossEraser = crossStart2 * crossEnd2 < 0

//     return didEraserCrossarrow && didarrowCrossEraser
// }