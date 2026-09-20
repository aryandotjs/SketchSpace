import { hitTest } from "@/app/geometry/hitTest"
import { DimentionsMultipleSelectBox, Element, historyBlock, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, panObj, Point, resizeEleObjType } from "../lib/whiteboard/tools/types"
import React, { Dispatch, SetStateAction } from "react"
import { renderAll } from "../lib/whiteboard/render"
import { findResizeSideAndAddResizeRef, HandleResizeMultipleElementDown, HandleResizeMultipleElementsMove, resizeElement } from "@/app/geometry/resize"
import { findMoveTargetAndAddMoveRef, HandleMoveMultipleElementsDown, moveElement } from "./move"
import { updateCursor } from "../geometry/updateCursor"
import { getMultipleSectionsDimentionsSecondary, handleMultipleSelectDown, handleMultipleSelectionFrameMove, handleMultipleSelectMove, handleMultipleSelectUp } from "./selection/selection"
import { fullCopyOfElements, fullCopyOfSingleElement } from "../helpers/helper"



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
    undoref: React.RefObject<historyBlock[]>

) => {

    if (!SelectedElement && !MultipleSelectedElements) {
        const element = hitTest(point, Elements)
        if (!element) {
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
            return
        }
        if (element) {
            const copy = fullCopyOfElements(Elements)
            const copyelement = fullCopyOfSingleElement(element)
            undoref.current.push({
                elements: copy,
                selectedElement: copyelement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            setSelectedElement(copyelement)
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
            const copy = fullCopyOfElements(Elements)
            undoref.current.push({
                elements: copy,
                selectedElement: null,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            setMultipleSelectedElements(null)
            setDimentionsMutipleSelectionBox(null)
            curruntMultipleSelectObj.current = null
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
            return
        }
        if (element && event.shiftKey) {
            const copyallElement = fullCopyOfElements(Elements)
            const copy = fullCopyOfElements(MultipleSelectedElements)
            copy.push(fullCopyOfSingleElement(element))

            const newdimention = getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, copy)
            undoref.current.push({
                elements: copyallElement,
                selectedElement: null,
                multipleSelectedElements: copy,
                multipleSelectedDimentions: newdimention ?? null
            })

            setMultipleSelectedElements(copy)
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
            const copy = fullCopyOfElements(Elements)
            undoref.current.push({
                elements: copy,
                selectedElement: null,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            curruntMultipleSelectObj.current = handleMultipleSelectDown(point)
        }
        if (element && event.shiftKey) {

            const copyallELe = fullCopyOfElements(Elements)
            const copy = [fullCopyOfSingleElement(SelectedElement), fullCopyOfSingleElement(element)]

            const newdimention = getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, copy)
            undoref.current.push({
                elements: copyallELe,
                selectedElement: null,
                multipleSelectedElements: copy,
                multipleSelectedDimentions: newdimention ?? null
            })

            setMultipleSelectedElements(copy)
            setSelectedElement(null)
            return
        }
        if (element) {
            const copy = fullCopyOfElements(Elements)
            const copyelement = fullCopyOfSingleElement(element)
            undoref.current.push({
                elements: copy,
                selectedElement: copyelement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            setSelectedElement(copyelement)
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
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    undoref: React.RefObject<historyBlock[]>,
    panref: React.RefObject<panObj>

) => {
    const ctx = canvas?.getContext("2d")
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect()

    if (ResizeMultipleSelectObj.current) {
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj,
            curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox,
            MoveMultipleSelectObj, ResizeMultipleSelectObj, panref)
        HandleResizeMultipleElementsMove(ResizeMultipleSelectObj, MultipleSelectedElements, setMultipleSelectedElements, setDimentionsMutipleSelectionBox, Elements, setElements, point)
    }
    if (curruntMultipleSelectObj.current) {
        handleMultipleSelectionFrameMove(Elements, point, curruntMultipleSelectObj, canvas, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, curruntMoveElementObj, curruntResizeElementObj, ResizeMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj,
            curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox,
            MoveMultipleSelectObj, ResizeMultipleSelectObj, panref)
    }
    if (MoveMultipleSelectObj.current) {
        if (MoveMultipleSelectObj.current.movement === "Still") {
            const newSet = new Set(MultipleSelectedElements?.map((a => a.id)))
            const filteredarr = Elements.filter((a, b) => !newSet.has(a.id))
            setElements(filteredarr)
            setMultipleSelectedElements(null)
            setDimentionsMutipleSelectionBox(null)
            MoveMultipleSelectObj.current.movement = "Moved"
        }
        handleMultipleSelectMove(point, MoveMultipleSelectObj)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj,
            curruntResizeElementObj, curruntMultipleSelectObj, MultipleSelectedElements,
            DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj, panref)
    }
    if (curruntMoveElementObj.current) {
        if (curruntMoveElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntMoveElementObj.current?.index)
            setElements(filteredarr)
            setSelectedElement(null)
            curruntMoveElementObj.current.movement = "Moved"
        }
        moveElement(curruntMoveElementObj, point)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj,
            curruntResizeElementObj, null, MultipleSelectedElements, DimentionsMutipleSelectionBox,
            MoveMultipleSelectObj, ResizeMultipleSelectObj, panref)
    }
    if (curruntResizeElementObj.current) {
        if (curruntResizeElementObj.current.movement === "Still") {
            const filteredarr = Elements.filter((a, b) => b !== curruntResizeElementObj.current?.index)
            setElements(filteredarr)
            setSelectedElement(null)
            curruntResizeElementObj.current.movement = "Moved"
        }
        resizeElement(curruntResizeElementObj, point)
        renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElementObj, curruntResizeElementObj, null, MultipleSelectedElements,
            DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj, panref)
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
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>
) => {
    if (curruntMultipleSelectElement.current) {
        handleMultipleSelectUp(canvas,
            Elements,
            curruntMultipleSelectElement,
            SelectedElement,
            setSelectedElement,
            setMultipleSelectedElements,
            setDimentionsMutipleSelectionBox,
            MultipleSelectedElements,
            DimentionsMutipleSelectionBox,
            MoveMultipleSelectObj,
            curruntMoveElement,
            curruntResizeElement,
            ResizeMultipleSelectObj,
            undoref
        )
    }

    if (curruntResizeElement.current && curruntResizeElement.current.movement === "Moved") {
        if (curruntResizeElement.current.Element.type === "freedraw") {
            curruntResizeElement.current.Element.SnapshotPoints = curruntResizeElement.current.Element.points.map(a => ({ ...a }))
        }
        const copy = fullCopyOfElements(Elements)
        const copyelement = fullCopyOfSingleElement(curruntResizeElement.current.Element)
        if (curruntResizeElement.current.index != null) {
            copy.splice(curruntResizeElement.current.index,
                0, curruntResizeElement.current.Element)
            setSelectedElement(copyelement)
            undoref.current.push({
                elements: copy,
                selectedElement: copyelement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setElements(copy)
        }
    }
    if (curruntMoveElement.current && curruntMoveElement.current.movement === "Moved") {
        if (curruntMoveElement.current.Element.type === "freedraw") {
            curruntMoveElement.current.Element.SnapshotPoints = curruntMoveElement.current.Element.points.map(point => ({ ...point }))
        }
        const copy = fullCopyOfElements(Elements)
        const copyelement = fullCopyOfSingleElement(curruntMoveElement.current.Element)
        if (curruntMoveElement.current.index != null) {
            copy.splice(curruntMoveElement.current.index, 0, copyelement)
            setSelectedElement(copyelement)
            undoref.current.push({
                elements: copy,
                selectedElement: copyelement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setElements(copy)
        }
    }
    if (MoveMultipleSelectObj.current && MoveMultipleSelectObj.current.movement === "Moved") {

        const obj = MoveMultipleSelectObj.current
        const DimentionBox = obj.DimentionBox
        const EleAndIdx = obj.ElementsAndIndex

        const final = fullCopyOfElements(Elements)
        const mulSelEle: Element[] = []
        EleAndIdx?.forEach(a => {
            final.splice(a.index, 0, fullCopyOfSingleElement(a.element))
            mulSelEle.push(fullCopyOfSingleElement(a.element))
        })
        undoref.current.push({
            elements: final,
            selectedElement: null,
            multipleSelectedElements: mulSelEle,
            multipleSelectedDimentions: DimentionBox
        })

        setElements(final)
        setMultipleSelectedElements(mulSelEle)
        setDimentionsMutipleSelectionBox(DimentionBox)
        MoveMultipleSelectObj.current = null
    }
    if (ResizeMultipleSelectObj.current && ResizeMultipleSelectObj.current.movement === "Moved") {
        const obj = ResizeMultipleSelectObj.current
        const DimentionBox = obj.dimentions
        const EleAndIdx = obj.ElementsAndIndex
        if (!EleAndIdx) {
            MoveMultipleSelectObj.current = null
            return
        }

        const copy = fullCopyOfElements(Elements)
        EleAndIdx?.forEach(a => {
            copy.splice(a.index, 0, a.element)
        })
        const multiSeEle = EleAndIdx?.map((a) => a.element)

        undoref.current.push({
            elements: copy,
            selectedElement: null,
            multipleSelectedElements: multiSeEle,
            multipleSelectedDimentions: DimentionBox
        })

        setElements(copy)
        setMultipleSelectedElements(multiSeEle)
        setDimentionsMutipleSelectionBox(DimentionBox)
        MoveMultipleSelectObj.current = null
    }
    curruntResizeElement.current = null
    curruntMoveElement.current = null
    ResizeMultipleSelectObj.current = null
    MoveMultipleSelectObj.current = null
}