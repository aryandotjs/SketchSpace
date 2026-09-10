import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";
import { Element, LineElement, Point, StrokeStyle } from "./types";
import { Tool } from "../tools";
import { drawLine } from "../drawing";



export const linePointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): LineElement => {
    return {
        id: nanoid(),
        type: "line",
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

export const linePointerMove = (
    curruntLine: React.RefObject<LineElement | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntLine) return
    const Line = curruntLine.current
    if (!Line) return;
    Line.height = Line.y - point.y
    Line.width = Line.x - point.x
    drawLine(ctx, Line);
}

export const linePointerUp = (curruntLine: React.RefObject<LineElement | null>, setElements: Dispatch<SetStateAction<Element[]>>, settool: Dispatch<SetStateAction<Tool>>, setSelectedElement: Dispatch<SetStateAction<Element | null>>) => {
    if (!curruntLine) return
    const LineElement = curruntLine.current
    if (!LineElement) return
    setElements((prev) => ([...prev, LineElement]))
    setSelectedElement(curruntLine.current)
    curruntLine.current = null
    settool("Cursor")
}

export const ispointOnLine = (a: Point, b: Point, line: LineElement) => {
    const dx = line.width
    const dy = line.height


    // const dx = line.current.x - line.start.x
    // const dy = line.current.y - line.start.y

    const crossStart = dx * (line.y - a.y) - dy * (line.x - a.x)
    const crossEnd = dx * (line.y - b.y) - dy * (line.x - b.x)

    const didEraserCrossLine = crossStart * crossEnd < 0

    const ax = b.x - a.x
    const ay = b.y - a.y

    const crossStart2 = ax * (a.y - line.y) - ay * (a.x - line.x)
    const crossEnd2 = ax * (a.y - line.y) - ay * (a.x - line.x)

    const didLineCrossEraser = crossStart2 * crossEnd2 < 0

    return didEraserCrossLine && didLineCrossEraser
}