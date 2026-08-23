import React, { Dispatch, SetStateAction } from "react";
import { drawArrow, drawStroke } from "../drawing";
import { Arrow, Point, Shape, stylestroke } from "./types";
import { nanoid } from "nanoid";



export const arrowPointerDown = (point: Point, color: string, width: number, style: stylestroke, opacity: number): Arrow => {
    return {
        id: nanoid(),
        type: "arrow",
        start: point,
        current: point,
        color,
        width,
        style,
        opacity
    }
}

export const arrowPointerMove = (
    curruntarrow: React.RefObject<Arrow | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntarrow) return
    const arrow = curruntarrow.current
    if (!arrow) return;
    arrow.current = point
    drawArrow(ctx, arrow);
}

export const arrowPointerUp = (curruntarrow: React.RefObject<Arrow | null>, setshapes: Dispatch<SetStateAction<Shape[]>>) => {
    if (!curruntarrow) return
    const arrow = curruntarrow.current
    if (!arrow) return
    setshapes((prev) => ([...prev, arrow]))
    curruntarrow.current = null
}

export const ispointOnarrow = (a: Point, b: Point, arrow: Arrow) => {

    const dx = arrow.current.x - arrow.start.x
    const dy = arrow.current.y - arrow.start.y

    const crossStart = dx * (arrow.start.y - a.y) - dy * (arrow.start.x - a.x)
    const crossEnd = dx * (arrow.start.y - b.y) - dy * (arrow.start.x - b.x)

    const didEraserCrossarrow = crossStart * crossEnd < 0

    const ax = b.x - a.x
    const ay = b.y - a.y

    const crossStart2 = ax * (a.y - arrow.start.y) - ay * (a.x - arrow.start.x)
    const crossEnd2 = ax * (a.y - arrow.current.y) - ay * (a.x - arrow.current.x)

    const didarrowCrossEraser = crossStart2 * crossEnd2 < 0

    return didEraserCrossarrow && didarrowCrossEraser
}