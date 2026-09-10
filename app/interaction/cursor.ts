import { hitTest } from "@/app/geometry/hitTest"
import { Element, MoveEleObjType, Point, resizeEleObjType } from "../lib/whiteboard/tools/types"
import React, { Dispatch, SetStateAction } from "react"
import { renderAll } from "../lib/whiteboard/render"
import { findMoveTargetAndAddMoveRef, findResizeSideAndAddResizeRef, resizeElement } from "@/app/geometry/resize"
import { moveElement } from "./move"
import { updateCursor } from "../geometry/updateCursor"



export const cursorPointerDown = (
    point: Point,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    curruntResizeElement: React.RefObject<resizeEleObjType | null>,
    curruntMoveElement: React.RefObject<MoveEleObjType | null>
) => {

    if (!SelectedElement) {
        const element = hitTest(point, Elements)
        if (!element) {
            setSelectedElement(null)
            return
        }
        setSelectedElement(element)
    }

    if (SelectedElement) {

        if (findResizeSideAndAddResizeRef(SelectedElement, point, Elements, curruntResizeElement, setSelectedElement)) {
            return
        }

        if (findMoveTargetAndAddMoveRef(SelectedElement, point, Elements, curruntMoveElement, setSelectedElement)) {
            return
        }

        const element = hitTest(point, Elements)
        if (!element) {
            setSelectedElement(null)
        }
        setSelectedElement(element)

    }
}

export const cursorPointerMove = (
    curruntResizeElementObj: React.RefObject<resizeEleObjType | null>,
    curruntMoveElementObj: React.RefObject<MoveEleObjType | null>,
    point: Point,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    canvas: HTMLCanvasElement,
    SelectedElement: Element | null
) => {

    if (curruntMoveElementObj.current) {
        if (curruntMoveElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntMoveElementObj.current?.index)
            setElements(filteredarr)
            curruntMoveElementObj.current.movement = "Moved"
        }
        const ctx = canvas?.getContext("2d")
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();

        moveElement(curruntMoveElementObj, point)

        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj.current.Element)
    }
    if (curruntResizeElementObj.current) {
        if (curruntResizeElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntResizeElementObj.current?.index)
            setElements(filteredarr)
            curruntResizeElementObj.current.movement = "Moved"
        }
        const ctx = canvas?.getContext("2d")
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();

        resizeElement(curruntResizeElementObj, point)

        renderAll(ctx, Elements, rect, SelectedElement, curruntResizeElementObj.current.Element)
    }

    updateCursor(canvas, point, Elements, SelectedElement)
}

export const cursorPointerUp = (Elements: Element[], setElements: Dispatch<SetStateAction<Element[]>>, curruntResizeElement: React.RefObject<resizeEleObjType | null>, curruntMoveElement: React.RefObject<MoveEleObjType | null>) => {
    if (curruntResizeElement.current && curruntResizeElement.current.movement === "Moved") {
        const newarr = [...Elements]
        if (curruntResizeElement.current.index != null) {
            newarr.splice(curruntResizeElement.current.index, 0, curruntResizeElement.current.Element)
            setElements(newarr)
        }
    }
    if (curruntMoveElement.current && curruntMoveElement.current.movement === "Moved") {
        const newarr = [...Elements]
        if (curruntMoveElement.current.index != null) {
            newarr.splice(curruntMoveElement.current.index, 0, curruntMoveElement.current.Element)
            setElements(newarr)
        }
    }
    curruntResizeElement.current = null
    curruntMoveElement.current = null
}




