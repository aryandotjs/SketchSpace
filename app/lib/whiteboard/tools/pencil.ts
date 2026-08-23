import React, { Dispatch, SetStateAction } from "react";
import { drawStroke } from "../drawing";
import { Point, Shape, Stroke, stylestroke } from "./types";
import { nanoid } from "nanoid";



export const pencilPointerDown = (point: Point, color: string, width: number, style: stylestroke, opacity: number): Stroke => {
    return {
        id: nanoid(),
        type: "stroke",
        points: [point],
        color,
        width,
        style,
        opacity
    }
}

export const pencilPointerMove = (
    curruntStroke: React.RefObject<Stroke | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntStroke) return
    const stroke = curruntStroke.current
    if (!stroke) return;
    stroke.points.push(point)
    drawStroke(ctx, stroke);
}

export const pencilPointerUp = (curruntStroke: React.RefObject<Stroke | null>, setShape: Dispatch<SetStateAction<Shape[]>>) => {
    if (!curruntStroke) return
    const stroke = curruntStroke.current
    if (!stroke) return
    setShape((prev) => ([...prev, stroke]))
    curruntStroke.current = null
}