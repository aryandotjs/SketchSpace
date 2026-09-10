import React, { Dispatch, SetStateAction } from "react";
import { drawEllipse } from "../drawing";
import { Element, EllipseElement, Point, StrokeStyle } from "./types";
import { nanoid } from "nanoid";
import { Tool } from "../tools";
import { generalize } from "@/app/geometry/generalize";

export const ellipsePointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): EllipseElement => {
    return {
        id: nanoid(),
        type: "ellipse",
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

export const ellipsePointerMove = (
    currentEllipse: React.RefObject<EllipseElement | null> | null,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!currentEllipse) return
    const Ellipse = currentEllipse.current
    if (!Ellipse) return;
    Ellipse.height = Ellipse.y - point.y
    Ellipse.width = Ellipse.x - point.x
    drawEllipse(ctx, Ellipse);
}

export const ellipsePointerUp = (currentEllipse: React.RefObject<EllpseElement | null>, setElements: Dispatch<SetStateAction<Element[]>>, settool: Dispatch<SetStateAction<Tool>>, setSelectedElement: Dispatch<SetStateAction<Element | null>>) => {
    if (!currentEllipse) return
    const Ellipse = currentEllipse.current
    if (!Ellipse) return
    const genralized = generalize(Ellipse)

    setElements((prev) => ([...prev, genralized]))
    setSelectedElement(currentEllipse.current)
    currentEllipse.current = null
    settool("Cursor")
}

export const ispointonEllipse = (ellipse: EllipseElement, point: Point) => {
    const centerX = ellipse.x - ellipse.width / 2
    const centerY = ellipse.y - ellipse.height / 2

    const radiusX = Math.abs(ellipse.width) / 2
    const radiusY = Math.abs(ellipse.height) / 2

    const dx = point.x - centerX
    const dy = point.y - centerY

    const final = (dx * dx) / (radiusX * radiusX) +
        (dy * dy) / (radiusY * radiusY)

    return final < 1.2 && final > 0.8
} 