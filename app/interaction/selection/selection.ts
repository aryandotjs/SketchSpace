import { renderAll } from "@/app/lib/whiteboard/render";
import { DimentionsMultipleSelectBox, Element, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, Point } from "@/app/lib/whiteboard/tools/types";
import React, { Dispatch, SetStateAction } from "react";



export function handleMultipleSelectDown(
    point: Point,
): MultipleSelectObjType {
    return {
        left: point.x,
        top: point.y,
        bottom: 0,
        right: 0,
        MultipleSelectedElements: null,
        dimentionsInnerBox: null,
        movement: "Still"
    }

}

export function handleMultipleSelectionFrameMove(
    Elements: Element[],
    point: Point,
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
    canvas: HTMLCanvasElement,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    curruntMoveElement: React.RefObject<MoveEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,

) {
    const frame = curruntMultipleSelectObj.current
    if (!frame) return

    frame.right = point.x - frame.left
    frame.bottom = point.y - frame.top


    selectElementsInsideFrame(Elements, curruntMultipleSelectObj)

    const refObj = curruntMultipleSelectObj.current
    const selectedElements = curruntMultipleSelectObj.current?.MultipleSelectedElements
    if (refObj && selectedElements && selectedElements.length) {
        const ctx = canvas?.getContext("2d")
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect()
        if (selectedElements.length === 1) {
            refObj.dimentionsInnerBox = null
        }
        if (selectedElements.length > 1) {
            getMultipleSectionsDimentions(curruntMultipleSelectObj, Elements)
        }
        renderAll(ctx, Elements, rect, null, curruntMoveElement, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)
    }

}

export function handleMultipleSelectMove(
    point: Point,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,

) {
    if (!MoveMultipleSelectObj.current) return

    const box = MoveMultipleSelectObj.current?.DimentionBox
    if (!box || !box.left || !box.right || !box.top || !box.bottom) return

    const width = box.right - box.left
    const height = box.bottom - box.top
    box.left = point.x - MoveMultipleSelectObj.current.fromLeft
    box.top = point.y - MoveMultipleSelectObj.current.fromTop
    box.right = box.left + width
    box.bottom = box.top + height


    const dx = MoveMultipleSelectObj.current.point.x - point.x
    const dy = MoveMultipleSelectObj.current.point.y - point.y


    MoveMultipleSelectObj.current.ElementsAndIndex?.forEach((a) => {
        const ele = a.element
        if (ele.type === "freedraw") {
            const newPoints = ele.points.map((p) => {
                return {
                    ...p,
                    x: p.x - dx,
                    y: p.y - dy
                }
            })

            ele.points = newPoints
            ele.SnapshotPoints = newPoints

            // return
        }
        ele.x = ele.x - dx
        ele.y = ele.y - dy
    })

    MoveMultipleSelectObj.current.point.x = point.x
    MoveMultipleSelectObj.current.point.y = point.y

}

export function handleMultipleSelectUp(
    canvas: HTMLCanvasElement,
    Elements: Element[],
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>,
    curruntMoveElement: React.RefObject<MoveEleObjType | null>,
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,


) {
    const ctx = canvas?.getContext("2d")
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect()

    if (curruntMultipleSelectObj.current?.MultipleSelectedElements?.length === 1) {
        setSelectedElement(curruntMultipleSelectObj.current?.MultipleSelectedElements[0])
    }
    if (curruntMultipleSelectObj.current?.MultipleSelectedElements?.length && curruntMultipleSelectObj.current?.MultipleSelectedElements?.length > 1) {

        setMultipleSelectedElements(curruntMultipleSelectObj.current?.MultipleSelectedElements)
        setDimentionsMutipleSelectionBox(curruntMultipleSelectObj.current?.dimentionsInnerBox)
    }

    curruntMultipleSelectObj.current = null
    renderAll(ctx, Elements, rect, SelectedElement, curruntMoveElement, curruntMultipleSelectObj, MultipleSelectedElements, DimentionsMutipleSelectionBox, MoveMultipleSelectObj, ResizeMultipleSelectObj)

}


function selectElementsInsideFrame(
    Elements: Element[],
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
) {
    const frame = curruntMultipleSelectObj.current
    if (!frame) return
    const left = Math.min(frame?.left, frame?.left + frame?.right)
    const right = Math.max(frame?.left, frame?.left + frame?.right)
    const top = Math.min(frame.top, frame.top + frame.bottom)
    const bottom = Math.max(frame.top, frame.top + frame.bottom)
    const newset = new Set<string>([])
    Elements.forEach((e) => {
        if (e.type === "rectangle" || e.type === "ellipse" || e.type === "diamond" || e.type === "freedraw") {
            if (
                left < e.x
                &&
                right > e.x - e.width
                &&
                top < e.y
                &&
                bottom > e.y - e.height
            ) {
                newset.add(e.id)
            }
        }
        if (e.type === "arrow" || e.type === "line") {
            const lineLeft = Math.min(e.x, e.x - e.width)
            const lineRight = Math.max(e.x, e.x - e.width)
            const lineTop = Math.min(e.y, e.y - e.height)
            const lineBottom = Math.max(e.y, e.y - e.height)
            if (
                left < lineLeft
                &&
                right > lineRight
                &&
                top < lineTop
                &&
                bottom > lineBottom
            ) {
                newset.add(e.id)
            }
        }
    })
    const selectedElements = Elements.filter((a) => newset.has(a.id))
    if (selectedElements.length > 0) {
        frame.MultipleSelectedElements = selectedElements
    }
    if (selectedElements.length === 0) {
        frame.MultipleSelectedElements = null
    }
}


export function getMultipleSectionsDimentions(
    curruntMultipleSelectObj: React.RefObject<MultipleSelectObjType | null>,
    Elements: Element[],
) {
    if (!curruntMultipleSelectObj.current) return

    const SelectedElements = curruntMultipleSelectObj.current.MultipleSelectedElements
    if (!SelectedElements) return

    const dimentionsInnerBox = curruntMultipleSelectObj.current.dimentionsInnerBox

    const dimentions: DimentionsMultipleSelectBox = {
        top: null,
        bottom: null,
        left: null,
        right: null
    }
    SelectedElements.map((ele) => {
        if (!dimentions.top) {
            dimentions.top = ele.y
        }
        if (!dimentions.left) {
            dimentions.left = ele.x
        }
        if (!dimentions.right) {
            dimentions.right = ele.x - ele.width
        }
        if (!dimentions.bottom) {
            dimentions.bottom = ele.y - ele.height
        }

        if (dimentions.left > ele.x) {
            dimentions.left = ele.x
        }
        if (dimentions.right < ele.x - ele.width) {
            dimentions.right = ele.x - ele.width
        }
        if (dimentions.top > ele.y) {
            dimentions.top = ele.y
        }
        if (dimentions.bottom < ele.y - ele.height) {
            dimentions.bottom = ele.y - ele.height
        }
    })
    curruntMultipleSelectObj.current.dimentionsInnerBox = dimentions
}


export function getMultipleSectionsDimentionsSecondary(
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    MultipleSelectedElements: Element[] | null,
) {
    //creadted this for useeeffect thign 

    if (!MultipleSelectedElements) return

    const dimentions: DimentionsMultipleSelectBox = {
        top: null,
        bottom: null,
        left: null,
        right: null
    }
    MultipleSelectedElements.map((ele) => {
        if (!dimentions.top) {
            dimentions.top = ele.y
        }
        if (!dimentions.left) {
            dimentions.left = ele.x
        }
        if (!dimentions.right) {
            dimentions.right = ele.x - ele.width
        }
        if (!dimentions.bottom) {
            dimentions.bottom = ele.y - ele.height
        }

        if (dimentions.left > ele.x) {
            dimentions.left = ele.x
        }
        if (dimentions.right < ele.x - ele.width) {
            dimentions.right = ele.x - ele.width
        }
        if (dimentions.top > ele.y) {
            dimentions.top = ele.y
        }
        if (dimentions.bottom < ele.y - ele.height) {
            dimentions.bottom = ele.y - ele.height
        }
    })
    setDimentionsMutipleSelectionBox(dimentions)
} 
