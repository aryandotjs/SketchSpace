import React, { Dispatch, SetStateAction } from "react";
import { Element, FreedrawElement, Point, StrokeStyle } from "./types";
import { nanoid } from "nanoid";
import { drawFreedraw } from "../drawing";



export const pencilPointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): FreedrawElement => {
    return {
        id: nanoid(),
        type: "freedraw",
        x: point.x,
        y: point.y,
        points: [],
        SnapshotPoints: [],
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

export const pencilPointerMove = (
    curruntStroke: React.RefObject<FreedrawElement | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntStroke) return
    const stroke = curruntStroke.current
    if (!stroke) return;
    stroke.points.push(point)
    drawFreedraw(ctx, stroke);
}

export const pencilPointerUp = (curruntStroke: React.RefObject<FreedrawElement | null>, setElements: Dispatch<SetStateAction<Element[]>>) => {
    if (!curruntStroke) return
    const stroke = curruntStroke.current
    if (!stroke) return
    const final = createEdgesForFreedraw(stroke)
    final.SnapshotPoints = final.points.map(point => ({
        ...point
    }))
    if (final.points.length > 0) {
        setElements((prev) => ([...prev, final]))
    }
    curruntStroke.current = null
}

function createEdgesForFreedraw(freedraw: FreedrawElement): FreedrawElement {
    if (freedraw.points.length < 1) return freedraw
    let top = freedraw.y
    let bottom = 0
    let left = freedraw.x
    let right = 0

    freedraw.points.map((a) => {
        if (a.x < left) {
            left = a.x
        }
        if (a.x > right) {
            right = a.x
        }
        if (a.y < top) {
            top = a.y
        }
        if (a.y > bottom) {
            bottom = a.y
        }
    })

    freedraw.x = left
    freedraw.y = top
    freedraw.height = top - bottom
    freedraw.width = left - right

    return freedraw
}