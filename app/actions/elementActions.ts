import { Dispatch, SetStateAction } from "react"
import { DimentionsMultipleSelectBox, Element, FreedrawElement, Point } from "../lib/whiteboard/tools/types"
import { nanoid } from "nanoid"
import { getMultipleSectionsDimentionsSecondary } from "../interaction/selection/selection"


export const deleteElement = (
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,

) => {
    if (SelectedElement) {
        const filtered = Elements.filter(a => a.id !== SelectedElement.id)
        setElements(filtered)
        setSelectedElement(null)
    }
    if (MultipleSelectedElements) {
        const sets = new Set(MultipleSelectedElements)
        const filtered = Elements.filter(a => !sets.has(a))
        setElements(filtered)
        setMultipleSelectedElements(null)
        setDimentionsMutipleSelectionBox(null)
    }
}


export const DuplicateElementOrElements = (
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,

) => {

    if (SelectedElement) {
        const diff = 10
        if (SelectedElement.type !== "freedraw") {
            const newEle = {
                ...SelectedElement,
                id: nanoid(),
                x: SelectedElement.x + diff,
                y: SelectedElement.y + diff,
            }
            setElements((prev) => {
                return [...prev, newEle]
            })
            setSelectedElement(newEle)
            return
        }
        if (SelectedElement.type === "freedraw") {
            const newPoints = SelectedElement.points.map((a) => ({ ...a, x: a.x + diff, y: a.y + diff }))
            const newEle: FreedrawElement = {
                ...SelectedElement,
                id: nanoid(),
                x: SelectedElement.x + diff,
                y: SelectedElement.y + diff,
                points: newPoints,
                SnapshotPoints: newPoints
            }
            setElements((prev) => {
                return [...prev, newEle]
            })
            setSelectedElement(newEle)
            return
        }
    }
    if (MultipleSelectedElements) {
        if (!DimentionsMutipleSelectionBox || DimentionsMutipleSelectionBox.left === null ||
            DimentionsMutipleSelectionBox.right === null || DimentionsMutipleSelectionBox.top === null ||
            DimentionsMutipleSelectionBox.bottom === null) return
        const diff = 10
        const editedEle = MultipleSelectedElements.map(a => {
            if (a.type !== "freedraw") {
                return {
                    ...a,
                    id: nanoid(),
                    x: a.x + diff,
                    y: a.y + diff,
                }

            }
            if (a.type === "freedraw") {

                const newPoints = a.points.map((a) => ({ ...a, x: a.x + diff, y: a.y + diff }))
                const newEle: FreedrawElement = {
                    ...a,
                    id: nanoid(),
                    x: a.x + diff,
                    y: a.y + diff,
                    points: newPoints,
                    SnapshotPoints: newPoints
                }
                return newEle
            }
            return a
        })
        const newDimentions: DimentionsMultipleSelectBox = {
            ...DimentionsMutipleSelectionBox,
            top: DimentionsMutipleSelectionBox.top + diff,
            left: DimentionsMutipleSelectionBox.left + diff,
            bottom: DimentionsMutipleSelectionBox.bottom + diff,
            right: DimentionsMutipleSelectionBox.right + diff
        }
        setElements((prev) => {
            return [...prev, ...editedEle]
        })
        setMultipleSelectedElements(editedEle)
        setDimentionsMutipleSelectionBox(newDimentions)

    }
}

export const copyElementandElements = (
    SelectedElement: Element | null,
    MultipleSelectedElements: Element[] | null,
    clipboardRef: React.RefObject<Element[] | null>

) => {

    if (SelectedElement) {
        if (SelectedElement.type === "freedraw") {
            clipboardRef.current = [{
                ...SelectedElement,
                points: SelectedElement.points.map(a => ({ ...a })),
                SnapshotPoints: SelectedElement.points.map(a => ({ ...a }))
            }]
            return
        }
        clipboardRef.current = [{ ...SelectedElement }]

    }
    if (MultipleSelectedElements) {

        clipboardRef.current = MultipleSelectedElements.map((element) => {
            if (element.type === "freedraw") {
                return {
                    ...element,
                    points: element.points.map(a => ({ ...a })),
                    SnapshotPoints: element.points.map(a => ({ ...a }))
                }
            }
            return { ...element }
        })
    }
}



export const PasteElementOrElements = (
    // Elements: Element[],
    // SelectedElement: Element | null,
    // MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    setElements: Dispatch<SetStateAction<Element[]>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    clipboardRef: React.RefObject<Element[] | null>,
    currentPointRef: React.RefObject<Point | null>

) => {
    const CopyArray = clipboardRef.current
    const point = currentPointRef.current
    if (!CopyArray || !point) return
    if (CopyArray.length === 1) {
        const element = CopyArray[0]

        let copy = { ...element }

        const newX = point.x + copy.width / 2
        const newY = point.y + copy.height / 2

        if (copy.type === "freedraw") {

            const newPoints = copy.points.map((p) => {
                const fromLeft = p.x - copy.x
                const fromTop = p.y - copy.y

                return {
                    x: newX + fromLeft,
                    y: newY + fromTop
                }
            })

            copy.points = newPoints
            copy.SnapshotPoints = newPoints

        }
        copy.id = nanoid()
        copy.x = newX
        copy.y = newY



        setElements((prev) => {
            const curr = prev ?? []
            return [...prev, copy]
        })
        setSelectedElement(copy)

        return
    }


    if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.right || !DimentionsMutipleSelectionBox.top || !DimentionsMutipleSelectionBox.bottom) return
    const dimentionHeight = DimentionsMutipleSelectionBox.bottom - DimentionsMutipleSelectionBox.top
    const dimentionWidth = DimentionsMutipleSelectionBox.right - DimentionsMutipleSelectionBox.left
    const newX = point.x - dimentionWidth / 2
    const newY = point.y - dimentionHeight / 2

    const finalArray = CopyArray.map((element) => {
        if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.top) return { ...element }
        // if (element.type === "freedraw") {

        // }
        const fromLeft = element.x - DimentionsMutipleSelectionBox.left
        const fromTop = element.y - DimentionsMutipleSelectionBox.top

        return {
            ...element,
            id: nanoid(),
            x: newX + fromLeft,
            y: newY + fromTop
        }
    })

    setElements((prev) => {
        getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, [...finalArray])
        return [...prev, ...finalArray]
    })
    setMultipleSelectedElements(finalArray)


}