import React, { Dispatch, SetStateAction } from "react";
import { renderAll } from "../render";
import { ispointOnLine } from "./line";
import { Element, Point } from "./types";



export const eraserHandler = (
    previousPointRef: React.RefObject<Point | null>,
    ErasedElementIds: React.RefObject<string[] | null>,
    Elements: Element[],
    point: Point,
    ctx: CanvasRenderingContext2D,
    rect: DOMRect
) => {

    const previousPoint = previousPointRef.current;
    if (!previousPoint) { return }
    const erasedset = new Set(ErasedElementIds.current)
    let updated = false

    Elements.forEach((El) => {

        if (El.type === "line") {
            if (!erasedset.has(El.id)) {
                if (ispointOnLine(previousPoint, point, El)) {
                    erasedset.add(El.id)
                    updated = true
                }
            }
        }

        // if (s.type === "rectangle") {
        //     if (ispointInReactangle(previousPoint, point, s)) {
        //         erasedset.add(s.id)
        //         updated = true
        //     }
        // }

        // if (s.type === "ellipse") {
        //     if (ispointonEllipse(previousPoint, point, s)) {
        //         erasedset.add(s.id)
        //         updated = true
        //     }
        // }

        // if (s.type === "Diamond") {
        //     if (ispointInDiamond(previousPoint, point, s)) {
        //         erasedset.add(s.id)
        //         updated = true
        //     }
        // }
        // if (s.type === "arrow") {
        //     if (ispointOnarrow(previousPoint, point, s)) {
        //         erasedset.add(s.id)
        //         updated = true
        //     }
        // }

    })

    if (updated) {
        ErasedElementIds.current = Array.from(erasedset)
        const updatedShapes = Elements.map((El) => {
            return erasedset.has(El.id) ? { ...El, opacity: 10 } : El
        });
        // renderAll(ctx, updatedShapes, rect)
    }
    previousPointRef.current = point
}




export const eraserPointerUp = (
    previousPointRef: React.RefObject<Point | null>,
    allEraseshapes: React.RefObject<string[] | null>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[]
) => {

    if (!allEraseshapes.current) return
    const removedArr = Elements.filter((El) => {
        if (allEraseshapes.current?.find((a) => a == El.id)) {
            return false
        }
        return true
    })
    setElements(removedArr)
    previousPointRef.current = null
    allEraseshapes.current = null
}