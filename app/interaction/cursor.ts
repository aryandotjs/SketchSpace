import { hitTest } from "@/app/geometry/hitTest"
import { DimentionsMultipleSelectBox, Element, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, Point, resizeEleObjType } from "../lib/whiteboard/tools/types"
import React, { Dispatch, SetStateAction } from "react"
import { renderAll } from "../lib/whiteboard/render"
import { findResizeSideAndAddResizeRef, HandleResizeMultipleElementDown, HandleResizeMultipleElementsMove, resizeElement } from "@/app/geometry/resize"
import { findMoveTargetAndAddMoveRef, HandleMoveMultipleElementsDown, moveElement } from "./move"
import { updateCursor } from "../geometry/updateCursor"
import { handleMultipleSelectDown, handleMultipleSelectionFrameMove, handleMultipleSelectMove, handleMultipleSelectUp } from "./selection/selection"



export const cursorPointerDown = (
    point: Point,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    curruntResizeElement: React.RefObject<resizeEleObjType | null>,
    curruntMoveElement: React.RefObject<MoveEleObjType | null>,
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,


) => {
    // remove the multiple selected
    if (!SelectedElement && !MultipleSelectedElements) {
        console.log("in")
        const element = hitTest(point, Elements)
        if (!element) {
            setSelectedElement(null)
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
            return
        }
        if (element) {
            setSelectedElement(element)
        }
    }

    if (MultipleSelectedElements) {
        if (HandleMoveMultipleElementsDown(DimentionsMutipleSelectionBox, MultipleSelectedElements, setMultipleSelectedElements, point, Elements, setElements, MoveMultipleSelectObj)) {
            return
        }
        if (HandleResizeMultipleElementDown(DimentionsMutipleSelectionBox, MultipleSelectedElements, point, ResizeMultipleSelectObj)) {
            return
        }
        const element = hitTest(point, Elements)
        if (!element) {
            setMultipleSelectedElements(null)
            setDimentionsMutipleSelectionBox(null)
            curruntMultipleSelectObj.current = null
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
            return
        }
        setSelectedElement(element)
        setMultipleSelectedElements(null)
        setDimentionsMutipleSelectionBox(null)
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
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
        }
        setSelectedElement(element)

    }
}

export const cursorPointerMove = (
    curruntResizeElementObj: React.RefObject<resizeEleObjType | null>,
    curruntMoveElementObj: React.RefObject<MoveEleObjType | null>,
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
    point: Point,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    canvas: HTMLCanvasElement,
    SelectedElement: Element | null,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,

) => {
    const ctx = canvas?.getContext("2d")
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect()

    if (ResizeMultipleSelectObj.current) {
        HandleResizeMultipleElementsMove(ResizeMultipleSelectObj, point)
        renderAll(ctx, Elements, rect, SelectedElement, null, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
    }

    if (curruntMultipleSelectObj.current) {
        handleMultipleSelectionFrameMove(Elements, point, curruntMultipleSelectObj, canvas, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, null, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
    }
    if (MoveMultipleSelectObj.current) {
        handleMultipleSelectMove(point, MoveMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, null, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
    }
    if (curruntMoveElementObj.current) {
        if (curruntMoveElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntMoveElementObj.current?.index)
            setElements(filteredarr)
            curruntMoveElementObj.current.movement = "Moved"
        }
        ;

        moveElement(curruntMoveElementObj, point)

        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj.current.Element, null, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
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

        renderAll(ctx, Elements, rect, SelectedElement, curruntResizeElementObj.current.Element, null, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
    }
    updateCursor(canvas, point, Elements, SelectedElement, MultipleSelectedElements, DimentionsMutipleSelectionBox)
}

export const cursorPointerUp = (
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    curruntResizeElement: React.RefObject<resizeEleObjType | null>,
    curruntMoveElement: React.RefObject<MoveEleObjType | null>,
    curruntMultipleSelectElement: React.RefObject<MultipleSelectObjType | null>,
    canvas: HTMLCanvasElement,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,

) => {
    if (curruntResizeElement.current && curruntResizeElement.current.movement === "Moved") {
        if (curruntResizeElement.current.Element.type === "freedraw") {
            curruntResizeElement.current.Element.SnapshotPoints = curruntResizeElement.current.Element.points.map(a => ({ ...a }))
        }
        const newarr = [...Elements]
        if (curruntResizeElement.current.index != null) {
            newarr.splice(curruntResizeElement.current.index,
                0, curruntResizeElement.current.Element)
            setElements(newarr)
        }
    }
    if (curruntMoveElement.current && curruntMoveElement.current.movement === "Moved") {
        if (curruntMoveElement.current.Element.type === "freedraw") {
            curruntMoveElement.current.Element.SnapshotPoints = curruntMoveElement.current.Element.points.map(a => ({ ...a }))
        }
        const newarr = [...Elements]
        if (curruntMoveElement.current.index != null) {
            newarr.splice(curruntMoveElement.current.index, 0, curruntMoveElement.current.Element)
            setElements(newarr)
        }
    }
    if (curruntMultipleSelectElement.current) {
        handleMultipleSelectUp(canvas, Elements, curruntMultipleSelectElement, SelectedElement, setSelectedElement, setMultipleSelectedElements, setDimentionsMutipleSelectionBox, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj)
    }
    if (MoveMultipleSelectObj.current) {

        const obj = MoveMultipleSelectObj.current
        const DimentionBox = obj.DimentionBox
        const EleAndIdx = obj.ElementsAndIndex

        const final = [...Elements]
        EleAndIdx?.forEach(a => {
            final.splice(a.index, 0, a.element)
        })
        setElements(final)
        setDimentionsMutipleSelectionBox(DimentionBox)
        MoveMultipleSelectObj.current = null
    }

    curruntResizeElement.current = null
    curruntMoveElement.current = null
    ResizeMultipleSelectObj.current = null
}




