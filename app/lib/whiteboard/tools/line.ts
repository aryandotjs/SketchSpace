import React, { Dispatch, SetStateAction } from "react";
import { drawInfiniteLine, drawLine, drawStroke } from "../drawing";
import { Line, LineForgeometry, Point, Shape } from "./types";
import { nanoid } from "nanoid";



export const linePointerDown = (point: Point, color: string, width: number): Line => {
    return {
        id: nanoid(),
        type: "line",
        start: point,
        current: point,
        color,
        width
    }
}

export const linePointerMove = (
    curruntLine: React.RefObject<Line | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntLine) return
    const Line = curruntLine.current
    if (!Line) return;
    Line.current = point
    drawLine(ctx, Line);
}

export const linePointerUp = (curruntLine: React.RefObject<Line | null>, setshapes: Dispatch<SetStateAction<Shape[]>>) => {
    if (!curruntLine) return
    const Line = curruntLine.current
    if (!Line) return
    setshapes((prev) => ([...prev, Line]))
    curruntLine.current = null
}

export const ispointOnLine = (a: Point, b: Point, line: LineForgeometry) => {

    const dx = line.current.x - line.start.x
    const dy = line.current.y - line.start.y

    const crossStart = dx * (line.start.y - a.y) - dy * (line.start.x - a.x)
    const crossEnd = dx * (line.start.y - b.y) - dy * (line.start.x - b.x)

    const didEraserCrossLine = crossStart * crossEnd < 0

    const ax = b.x - a.x
    const ay = b.y - a.y

    const crossStart2 = ax * (a.y - line.start.y) - ay * (a.x - line.start.x)
    const crossEnd2 = ax * (a.y - line.current.y) - ay * (a.x - line.current.x)

    const didLineCrossEraser = crossStart2 * crossEnd2 < 0

    return didEraserCrossLine && didLineCrossEraser
}