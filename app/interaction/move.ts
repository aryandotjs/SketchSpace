import React, { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, MoveEleObjType, MoveMultipleEleObjType, Point } from "../lib/whiteboard/tools/types";
import { ispointInBoundedBox } from "../lib/whiteboard/tools/rectangle";


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


export const HandleMoveMultipleElements = (
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

