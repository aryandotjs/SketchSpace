import React, { Dispatch, SetStateAction } from "react";
import { Point, Diamond, Shape, stylestroke } from "./types";
import { nanoid } from "nanoid";
import { ispointOnLine } from "./line";
import { drawdiamond } from "../drawing";

export const diamondPointerDown = (point: Point, color: string, width: number, style: stylestroke, opacity: number): Diamond => {
    return {
        id: nanoid(),
        type: "Diamond",
        start: point,
        current: point,
        color,
        width,
        style,
        opacity
    }
}

export const diamondPointerMove = (
    curruntdiamond: React.RefObject<Diamond | null>,
    ctx: CanvasRenderingContext2D,
    point: Point
) => {
    if (!curruntdiamond) return
    const diamond = curruntdiamond.current
    if (!diamond) return;
    diamond.current = point

    drawdiamond(ctx, diamond);
}

export const diamondPointerUp = (curruntdiamond: React.RefObject<Diamond | null>, setshapes: Dispatch<SetStateAction<Shape[]>>) => {
    const diamond = curruntdiamond.current
    if (!diamond) return
    setshapes((prev) => ([...prev, diamond]))
    curruntdiamond.current = null
}


export const ispointInDiamond = (previousPoint: Point, point: Point, diamond: Diamond) => {

    // ctx.moveTo((current.x + start.x) / 2, start.y)
    // ctx.lineTo(current.x, (current.y + start.y) / 2)
    // ctx.lineTo((current.x + start.x) / 2, current.y)
    // ctx.lineTo(start.x, (current.y + start.y) / 2)

    const a = { x: (diamond.current.x + diamond.start.x) / 2, y: diamond.start.y }
    const b = { x: diamond.current.x, y: (diamond.current.y + diamond.start.y) / 2 }
    const c = { x: (diamond.current.x + diamond.start.x) / 2, y: diamond.current.y }
    const d = { x: diamond.start.x, y: (diamond.current.y + diamond.start.y) / 2 }

    if (ispointOnLine(previousPoint, point, { start: a, current: b, }) ||
        ispointOnLine(previousPoint, point, { start: b, current: c, }) ||
        ispointOnLine(previousPoint, point, { start: c, current: d, }) ||
        ispointOnLine(previousPoint, point, { start: d, current: a, })
    ) {
        return true
    }

    return false
}