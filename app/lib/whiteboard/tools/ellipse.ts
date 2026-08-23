import React, { Dispatch, SetStateAction } from "react";
import { drawEllipse } from "../drawing";
import { Ellipse, Point, Shape } from "./types";
import { nanoid } from "nanoid";

export const ellipsePointerDown = (point: Point, color: string, width: number): Ellipse => {
    return {
        id: nanoid(),
        type: "ellipse",
        start: point,
        current: point,
        color,
        width
    }
}

export const ellipsePointerMove = (
    currentEllipse: React.RefObject<Ellipse | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!currentEllipse) return
    const Ellipse = currentEllipse.current
    if (!Ellipse) return;
    Ellipse.current = point
    drawEllipse(ctx, Ellipse);
}

export const ellipsePointerUp = (currentEllipse: React.RefObject<Ellipse | null>, setshapes: Dispatch<SetStateAction<Shape[]>>) => {
    if (!currentEllipse) return
    const Ellipse = currentEllipse.current
    if (!Ellipse) return
    setshapes((prev) => ([...prev, Ellipse]))
    currentEllipse.current = null
}

export const ispointonEllipse = (previousPoint: Point, point: Point, ellipse: Ellipse) => {
    return false
} 