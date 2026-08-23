import React, { Dispatch, SetStateAction } from "react";
import { drawRectangle } from "../drawing";
import { Point, Rectangle, Shape, stylestroke } from "./types";
import { nanoid } from "nanoid";
import { ispointOnLine } from "./line";

export const rectanglePointerDown = (point: Point, color: string, width: number, style: stylestroke, opacity: number): Rectangle => {
    return {
        id: nanoid(),
        type: "rectangle",
        start: point,
        current: point,
        color,
        width,
        style,
        opacity
    }
}

export const rectanglePointerMove = (
    curruntRectangle: React.RefObject<Rectangle | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntRectangle) return
    const Rectangle = curruntRectangle.current
    if (!Rectangle) return;
    Rectangle.current = point
    drawRectangle(ctx, Rectangle);
}

export const rectanglePointerUp = (curruntRectangle: React.RefObject<Rectangle | null>, setshapes: Dispatch<SetStateAction<Shape[]>>) => {
    if (!curruntRectangle) return
    const Rectangle = curruntRectangle.current
    if (!Rectangle) return
    setshapes((prev) => ([...prev, Rectangle]))
    curruntRectangle.current = null

}

export const ispointInReactangle = (previousPoint: Point, point: Point, rectangle: Rectangle) => {

    const a = { x: rectangle.start.x, y: rectangle.start.x }
    const b = { x: rectangle.current.x, y: rectangle.start.y }
    const c = { x: rectangle.current.x, y: rectangle.current.x }
    const d = { x: rectangle.start.x, y: rectangle.current.y }

    if (ispointOnLine(previousPoint, point, { start: a, current: b, }) ||
        ispointOnLine(previousPoint, point, { start: b, current: c, }) ||
        ispointOnLine(previousPoint, point, { start: c, current: d, }) ||
        ispointOnLine(previousPoint, point, { start: d, current: a, })
    ) {
        return true
    }

    return false
}