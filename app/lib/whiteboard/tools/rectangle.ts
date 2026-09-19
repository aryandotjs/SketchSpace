import React, { Dispatch, SetStateAction } from "react";
import { drawRectangle } from "../drawing";
import { BorderType, Element, fillStyleEnum, historyBlock, Point, RectangleElement, Sloppyness, StrokeStyle } from "./types";
import { nanoid } from "nanoid";
import { ispointOnLine } from "./line";
import { Tool } from "../tools";
import { generalize } from "@/app/geometry/generalize";
import { fullCopyOfElements } from "@/app/helpers/helper";

export const rectanglePointerDown = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string, border: BorderType): RectangleElement => {
    return {
        id: nanoid(),
        type: "rectangle",
        x: point.x,
        y: point.y,
        height: 0,
        width: 0,
        strokeColor,
        strokeWidth,
        strokeStyle,
        backgroundColor,
        fillStyle: fillStyleEnum.Solid,
        opacity,
        sloppyness: Sloppyness.normal,
        border,
        locked: false,
        angle: 0,
    }
}

export const rectanglePointerMove = (
    curruntRectangle: React.RefObject<RectangleElement | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntRectangle) return
    const Rectangle = curruntRectangle.current
    if (!Rectangle) return;
    Rectangle.height = Rectangle.y - point.y
    Rectangle.width = Rectangle.x - point.x
    drawRectangle(ctx, Rectangle);
}


export const rectanglePointerUp = (
    curruntRectangle: React.RefObject<RectangleElement | null>,
    elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    settool: Dispatch<SetStateAction<Tool>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>
) => {
    if (!curruntRectangle) return
    const Rectangle = curruntRectangle.current
    if (!Rectangle) return
    if (Rectangle.height === 0 && Rectangle.width === 0) {
        curruntRectangle.current = null
        return
    }
    const genralized = generalize(Rectangle)
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

    curruntRectangle.current = null
    settool("Cursor")
}

export const ispointInBoundedBox = (x: number,
    y: number, height: number, width: number, point: Point) => {
    const left = Math.min(x, x - width)
    const right = Math.max(x, x - width)
    const top = Math.min(y, y - height)
    const bottom = Math.max(y, y - height)
    if (
        left < point.x
        &&
        top < point.y
        &&
        right > point.x
        &&
        bottom > point.y
    ) {
        return true
    }
    return false
}

