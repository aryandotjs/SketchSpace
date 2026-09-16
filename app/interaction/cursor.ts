import { hitTest } from "@/app/geometry/hitTest"
import { DimentionsMultipleSelectBox, Element, historyBlock, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, Point, resizeEleObjType } from "../lib/whiteboard/tools/types"
import React, { Dispatch, SetStateAction } from "react"
import { renderAll } from "../lib/whiteboard/render"
import { findResizeSideAndAddResizeRef, HandleResizeMultipleElementDown, HandleResizeMultipleElementsMove, resizeElement } from "@/app/geometry/resize"
import { findMoveTargetAndAddMoveRef, HandleMoveMultipleElementsDown, moveElement } from "./move"
import { updateCursor } from "../geometry/updateCursor"
import { getMultipleSectionsDimentionsSecondary, handleMultipleSelectDown, handleMultipleSelectionFrameMove, handleMultipleSelectMove, handleMultipleSelectUp } from "./selection/selection"



export const cursorPointerDown = (
    event: React.PointerEvent,
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
        if (HandleResizeMultipleElementDown(DimentionsMutipleSelectionBox, MultipleSelectedElements, setMultipleSelectedElements, point, ResizeMultipleSelectObj, Elements, setElements)) {
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
        if (element && event.shiftKey) {
            setMultipleSelectedElements((prev) => {
                const currunt = prev ?? []
                const set = new Set(currunt)
                if (set.has(element)) {
                    return [...currunt]
                }
                getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, [...currunt, element])
                return [...currunt, element]
            })

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
        if (element && event.shiftKey) {
            setMultipleSelectedElements((prev) => {
                if (!prev) {
                    getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, [SelectedElement, element])
                    return [element, SelectedElement]
                }
                return prev
            })
            setSelectedElement(null)
            return
        }
        if (element) {
            setSelectedElement(element)
            return
        }
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
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    undoref: React.RefObject<historyBlock[]>

) => {
    const ctx = canvas?.getContext("2d")
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect()

    if (ResizeMultipleSelectObj.current) {
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
        HandleResizeMultipleElementsMove(ResizeMultipleSelectObj, MultipleSelectedElements, setMultipleSelectedElements, Elements, setElements, point)
    }

    if (curruntMultipleSelectObj.current) {
        handleMultipleSelectionFrameMove(Elements, point, curruntMultipleSelectObj, canvas, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, curruntMoveElementObj, curruntResizeElementObj, ResizeMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
    }
    if (MoveMultipleSelectObj.current) {
        handleMultipleSelectMove(point, MoveMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
    }
    if (curruntMoveElementObj.current) {
        if (curruntMoveElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntMoveElementObj.current?.index)
            setElements(filteredarr)
            setSelectedElement(null)
            curruntMoveElementObj.current.movement = "Moved"
        }
        moveElement(curruntMoveElementObj, point)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, null, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
    }
    if (curruntResizeElementObj.current) {
        if (curruntResizeElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntResizeElementObj.current?.index)
            setElements(filteredarr)
            setSelectedElement(null)
            curruntResizeElementObj.current.movement = "Moved"
        }
        resizeElement(curruntResizeElementObj, point)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, null, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
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
    undoref: React.RefObject<historyBlock[]>
) => {
    if (curruntResizeElement.current && curruntResizeElement.current.movement === "Moved") {
        // if (curruntResizeElement.current.Element.type === "freedraw") {
        //     curruntResizeElement.current.Element.SnapshotPoints = curruntResizeElement.current.Element.points.map(a => ({ ...a }))
        // }
        const newarr = Elements.map(a => ({ ...a }))
        if (curruntResizeElement.current.index != null) {
            newarr.splice(curruntResizeElement.current.index,
                0, curruntResizeElement.current.Element)
            setSelectedElement(curruntResizeElement.current.Element)
            undoref.current.push({ elements: newarr, selectedElement: curruntResizeElement.current.Element })
            setElements(newarr)
        }
    }
    if (curruntMoveElement.current && curruntMoveElement.current.movement === "Moved") {
        // if (curruntMoveElement.current.Element.type === "freedraw") {
        //     curruntMoveElement.current.Element.SnapshotPoints = curruntMoveElement.current.Element.points.map(a => ({ ...a }))
        // }
        const newarr = Elements.map(a => ({ ...a }))
        if (curruntMoveElement.current.index != null) {
            newarr.splice(curruntMoveElement.current.index, 0, curruntMoveElement.current.Element)
            setSelectedElement(curruntMoveElement.current.Element)
            undoref.current.push({ elements: newarr, selectedElement: curruntMoveElement.current.Element })
            setElements(newarr)
        }
    }
    if (curruntMultipleSelectElement.current) {
        handleMultipleSelectUp(canvas, Elements, curruntMultipleSelectElement, SelectedElement, setSelectedElement, setMultipleSelectedElements, setDimentionsMutipleSelectionBox, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, curruntMoveElement, curruntResizeElement, ResizeMultipleSelectObj)
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
    if (ResizeMultipleSelectObj.current) {
        const obj = ResizeMultipleSelectObj.current
        const DimentionBox = obj.dimentions
        const EleAndIdx = obj.ElementsAndIndex
        if (!EleAndIdx) { return }

        const final = Elements.map(a => ({ ...a }))
        EleAndIdx?.forEach(a => {
            final.splice(a.index, 0, a.element)
        })
        const multiSeEle = EleAndIdx?.map((a) => {
            return { ...a.element }
        })
        setElements(final)
        setMultipleSelectedElements(multiSeEle)
        setDimentionsMutipleSelectionBox(DimentionBox)
        MoveMultipleSelectObj.current = null
    }
    curruntResizeElement.current = null
    curruntMoveElement.current = null
    ResizeMultipleSelectObj.current = null
}




