import React, { Dispatch, SetStateAction } from "react";
import { drawEllipse } from "../drawing";
import { Element, EllipseElement, historyBlock, Point, StrokeStyle } from "./types";
import { nanoid } from "nanoid";
import { Tool } from "../tools";
import { generalize } from "@/app/geometry/generalize";
import { fullCopyOfElements } from "@/app/helpers/helper";

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

export const ellipsePointerUp = (
    currentEllipse: React.RefObject<EllipseElement | null>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    settool: Dispatch<SetStateAction<Tool>>,
    elements: Element[],
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>

) => {
    if (!currentEllipse) return
    const Ellipse = currentEllipse.current
    if (!Ellipse) return
    if (Ellipse.height === 0 && Ellipse.width === 0) {
        currentEllipse.current = null
        return
    }
    const genralized = generalize(Ellipse)
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