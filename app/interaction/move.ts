import React, { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, MoveEleObjType, MoveMultipleEleObjType, Point } from "../lib/whiteboard/tools/types";
import { ispointInBoundedBox } from "../lib/whiteboard/tools/rectangle";
import { isPointNearLine } from "../geometry/hitTest";


export const moveElement = (curruntMoveElementObj: React.RefObject<MoveEleObjType | null>, point: Point) => {
    if (!curruntMoveElementObj.current) {
        return
    }
    const ele = curruntMoveElementObj.current.Element
    const eleObj = curruntMoveElementObj.current

    let dx = ele.x
    let dy = ele.y

    ele.x = + point.x - eleObj.fromLeft
    ele.y = point.y - eleObj.fromTop

    if (ele.type === "freedraw") {
        dx = dx - ele.x
        dy = dy - ele.y

        ele.points.map((a) => {
            a.x = a.x - dx
            a.y = a.y - dy
        })
    }

}

export const findMoveTargetAndAddMoveRef = (SelectedElement: Element, point: Point, Elements: Element[], curruntMoveElement: React.RefObject<MoveEleObjType | null>, setSelectedElement: Dispatch<SetStateAction<Element | null>>) => {
    let touched = false
    if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {

        if (ispointInBoundedBox(SelectedElement.x, SelectedElement.y, SelectedElement.height, SelectedElement.width, point)) {
            const MoveElementObj: MoveEleObjType = {
                point,
                Element: SelectedElement,
                index: null,
                fromTop: point.y - SelectedElement.y,
                fromLeft: point.x - SelectedElement.x,
                movement: "Still"
            }
            const index = Elements.findIndex((a) => a.id === SelectedElement.id)
            if (index >= 0) {
                MoveElementObj.index = index
                curruntMoveElement.current = MoveElementObj
            }
            touched = true
        }
    }

    if (SelectedElement.type === "line" || SelectedElement.type === "arrow") {

        if (isPointNearLine(SelectedElement.x, SelectedElement.y, SelectedElement.height, SelectedElement.width, point)) {
            const MoveElementObj: MoveEleObjType = {
                point,
                Element: SelectedElement,
                index: null,
                fromTop: point.y - SelectedElement.y,
                fromLeft: point.x - SelectedElement.x,
                movement: "Still"
            }
            const index = Elements.findIndex((a) => a.id === SelectedElement.id)
            if (index >= 0) {
                MoveElementObj.index = index
                curruntMoveElement.current = MoveElementObj
            }
            touched = true

        }
    }

    return touched
}
export const HandleMoveMultipleElementsDown = (
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    point: Point,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>
) => {
    if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox?.left || !DimentionsMutipleSelectionBox?.top ||
        !DimentionsMutipleSelectionBox?.right || !DimentionsMutipleSelectionBox?.bottom) {
        return
    }
    let touched = false
    const x = DimentionsMutipleSelectionBox?.left
    const y = DimentionsMutipleSelectionBox?.top
    const width = DimentionsMutipleSelectionBox?.left - DimentionsMutipleSelectionBox?.right
    const height = DimentionsMutipleSelectionBox?.top - DimentionsMutipleSelectionBox?.bottom
    if (ispointInBoundedBox(x, y, height, width, point)) {

        if (!MultipleSelectedElements || MultipleSelectedElements?.length === 0) return

        const MoveMultipeObj: MoveMultipleEleObjType = {
            point,
            ElementsAndIndex: null,
            DimentionBox: DimentionsMutipleSelectionBox,
            fromTop: point.y - DimentionsMutipleSelectionBox.top,
            fromLeft: point.x - DimentionsMutipleSelectionBox.left,
            movement: "Still"
        }
        const newSet = new Set<string>(MultipleSelectedElements.map((a) => a.id))

        const EleAndIdx: { element: Element, index: number }[] = []

        const filtered = Elements.filter((e, i) => {
            if (newSet.has(e.id)) {
                EleAndIdx.push({ element: e, index: i })
            }
            return !newSet.has(e.id)
        })

        if (EleAndIdx.length > 0) {
            MoveMultipeObj.ElementsAndIndex = EleAndIdx
        }

        MoveMultipleSelectObj.current = MoveMultipeObj
        setElements(filtered)

        touched = true
    }
    return touched
}


