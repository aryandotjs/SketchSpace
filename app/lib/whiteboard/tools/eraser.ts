import React, { Dispatch, SetStateAction } from "react";
import { renderAll } from "../render";
import { ispointOnLine } from "./line";
import { Point, Shape } from "./types";
import { ispointInReactangle } from "./rectangle";
import { ispointonEllipse } from "./ellipse";
import { ispointInDiamond } from "./diamond";
import { ispointOnarrow } from "./arrow";



export const eraserHandler = (
    previousPointRef: React.RefObject<Point | null>,
    allEraseshapes: React.RefObject<string[] | null>,
    shapes: Shape[],
    point: Point,
    ctx: CanvasRenderingContext2D,
    rect: DOMRect
) => {

    const previousPoint = previousPointRef.current;
    if (!previousPoint) { return }
    const erasedset = new Set(allEraseshapes.current)
    let updated = false

    shapes.forEach((s) => {

        if (s.type === "line") {
            if (!erasedset.has(s.id)) {
                if (ispointOnLine(previousPoint, point, s)) {
                    erasedset.add(s.id)
                    updated = true
                }
            }
        }

        if (s.type === "rectangle") {
            if (ispointInReactangle(previousPoint, point, s)) {
                erasedset.add(s.id)
                updated = true
            }
        }

        if (s.type === "ellipse") {
            if (ispointonEllipse(previousPoint, point, s)) {
                erasedset.add(s.id)
                updated = true
            }
        }

        if (s.type === "Diamond") {
            if (ispointInDiamond(previousPoint, point, s)) {
                erasedset.add(s.id)
                updated = true
            }
        }
        if (s.type === "arrow") {
            if (ispointOnarrow(previousPoint, point, s)) {
                erasedset.add(s.id)
                updated = true
            }
        }

    })

    if (updated) {
        allEraseshapes.current = Array.from(erasedset)
        const updatedShapes = shapes.map((shape) => {
            return erasedset.has(shape.id) ? { ...shape, opacity: 10 } : shape
        });
        renderAll(ctx, updatedShapes, rect)
    }
    previousPointRef.current = point
}




export const eraserPointerUp = (
    previousPointRef: React.RefObject<Point | null>,
    allEraseshapes: React.RefObject<string[] | null>,
    setshapes: Dispatch<SetStateAction<Shape[]>>,
    shapes: Shape[]
) => {

    if (!allEraseshapes.current) return
    const removedArr = shapes.filter((shape) => {
        if (allEraseshapes.current?.find((a) => a == shape.id)) {
            return false
        }
        return true
    })
    setshapes(removedArr)
    previousPointRef.current = null
    allEraseshapes.current = null
}