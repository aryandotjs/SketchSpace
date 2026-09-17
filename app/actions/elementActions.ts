import { Dispatch, SetStateAction } from "react"
import { DimentionsMultipleSelectBox, Element, FreedrawElement, historyBlock, Point } from "../lib/whiteboard/tools/types"
import { nanoid } from "nanoid"
import { getMultipleSectionsDimentionsSecondary } from "../interaction/selection/selection"
import { toolChangeHandler } from "../interaction/selection/toolchange"
import { Tool } from "../lib/whiteboard/tools"
import { fullCopyOfElements, fullCopyOfSingleElement } from "../helpers/helper"


export const deleteElement = (
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    MultipleSelectedElements: Element[] | null,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>
) => {
    if (SelectedElement) {
        const filtered = Elements.filter(a => a.id !== SelectedElement.id)

        undoref.current.push({
            elements: fullCopyOfElements(filtered),
            selectedElement: null,
            multipleSelectedElements: null,
            multipleSelectedDimentions: null
        })
        redoref.current = []
        setElements(filtered)
        setSelectedElement(null)
    }
    if (MultipleSelectedElements) {
        const sets = new Set(MultipleSelectedElements.map(a => a.id))
        const filtered = Elements.filter(a => !sets.has(a.id))

        undoref.current.push({
            elements: fullCopyOfElements(filtered),
            selectedElement: null,
            multipleSelectedElements: null,
            multipleSelectedDimentions: null
        })
        redoref.current = []

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
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>

) => {

    if (SelectedElement) {
        const diff = 10
        if (SelectedElement.type !== "freedraw") {
            const copy = fullCopyOfElements(Elements)
            const copyElement = fullCopyOfSingleElement(SelectedElement)
            copyElement.id = nanoid()
            copyElement.x = copyElement.x + diff
            copyElement.y = copyElement.y + diff
            copy.push(copyElement)

            undoref.current.push({
                elements: copy,
                selectedElement: copyElement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setElements(copy)
            setSelectedElement(copyElement)

            return
        }
        if (SelectedElement.type === "freedraw") {
            const copy = fullCopyOfElements(Elements)
            const copyElement = fullCopyOfSingleElement(SelectedElement)
            if (copyElement.type === "freedraw") {

                copyElement.id = nanoid()
                copyElement.x = copyElement.x + diff
                copyElement.y = copyElement.y + diff

                copyElement.points = SelectedElement.points.map((a) => ({ x: a.x + diff, y: a.y + diff }))
                copyElement.SnapshotPoints = SelectedElement.points.map((a) => ({ x: a.x + diff, y: a.y + diff }))

                copy.push(copyElement)

                undoref.current.push({
                    elements: copy,
                    selectedElement: copyElement,
                    multipleSelectedElements: null,
                    multipleSelectedDimentions: null
                })
                redoref.current = []
                setElements(copy)
                setSelectedElement(copyElement)
                return
            }
        }
    }
    if (MultipleSelectedElements) {
        if (!DimentionsMutipleSelectionBox || DimentionsMutipleSelectionBox.left === null ||
            DimentionsMutipleSelectionBox.right === null || DimentionsMutipleSelectionBox.top === null ||
            DimentionsMutipleSelectionBox.bottom === null) return
        const diff = 10

        const copyElements = fullCopyOfElements(Elements)
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
                const newSnapPoints = a.points.map((a) => ({ ...a, x: a.x + diff, y: a.y + diff }))
                const newEle: FreedrawElement = {
                    ...a,
                    id: nanoid(),
                    x: a.x + diff,
                    y: a.y + diff,
                    points: newPoints,
                    SnapshotPoints: newSnapPoints
                }
                return newEle
            }
            return a
        })
        copyElements.push(...editedEle)
        const newdimentions = getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, editedEle)

        undoref.current.push({
            elements: copyElements,
            selectedElement: null,
            multipleSelectedElements: editedEle,
            multipleSelectedDimentions: newdimentions ?? null
        })
        redoref.current = []
        setElements(copyElements)
        setMultipleSelectedElements(editedEle)
    }
}

export const copyElementandElements = (
    SelectedElement: Element | null,
    MultipleSelectedElements: Element[] | null,
    clipboardRef: React.RefObject<Element[] | null>

) => {

    if (SelectedElement) {
        const copy = fullCopyOfSingleElement(SelectedElement)
        clipboardRef.current = [copy]
    }
    if (MultipleSelectedElements) {
        clipboardRef.current = fullCopyOfElements(MultipleSelectedElements)
    }
}


export const PasteElementOrElements = (
    // SelectedElement: Element | null,
    // MultipleSelectedElements: Element[] | null,
    Elements: Element[],
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    setElements: Dispatch<SetStateAction<Element[]>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    clipboardRef: React.RefObject<Element[] | null>,
    currentPointRef: React.RefObject<Point | null>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>

) => {
    const CopyArray = clipboardRef.current
    const point = currentPointRef.current
    if (!CopyArray || !point) return

    if (CopyArray.length === 1) {
        const element = CopyArray[0]

        let copyEle = fullCopyOfSingleElement(element)

        const newX = point.x + copyEle.width / 2
        const newY = point.y + copyEle.height / 2

        if (copyEle.type === "freedraw") {

            const newPoints = copyEle.points.map((p) => {
                const fromLeft = p.x - copyEle.x
                const fromTop = p.y - copyEle.y
                return {
                    x: newX + fromLeft,
                    y: newY + fromTop
                }
            })
            const newSnapPoints = copyEle.points.map((p) => {
                const fromLeft = p.x - copyEle.x
                const fromTop = p.y - copyEle.y
                return {
                    x: newX + fromLeft,
                    y: newY + fromTop
                }
            })

            copyEle.points = newPoints
            copyEle.SnapshotPoints = newSnapPoints

        }
        copyEle.id = nanoid()
        copyEle.x = newX
        copyEle.y = newY

        const copyElements = fullCopyOfElements(Elements)
        copyElements.push(copyEle)

        undoref.current.push({
            elements: copyElements,
            selectedElement: copyEle,
            multipleSelectedElements: null,
            multipleSelectedDimentions: null
        })
        redoref.current = []

        setElements(copyElements)
        setSelectedElement(copyEle)

        return
    }

    if (CopyArray.length > 1) {

        if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.right || !DimentionsMutipleSelectionBox.top || !DimentionsMutipleSelectionBox.bottom) return

        const dimentionHeight = DimentionsMutipleSelectionBox.bottom - DimentionsMutipleSelectionBox.top
        const dimentionWidth = DimentionsMutipleSelectionBox.right - DimentionsMutipleSelectionBox.left
        const newX = point.x - dimentionWidth / 2
        const newY = point.y - dimentionHeight / 2

        const finalArray = CopyArray.map((element, index) => {
            if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.top) return { ...element }
            const fromLeft = element.x - DimentionsMutipleSelectionBox.left
            const fromTop = element.y - DimentionsMutipleSelectionBox.top

            if (element.type === "freedraw") {
                const newppoints = element.points.map(a => {
                    const fromEleTop = a.y - element.y
                    const fromEleLeft = a.x - element.x
                    return {
                        ...a,
                        x: newX + fromLeft + fromEleLeft,
                        y: newY + fromTop + fromEleTop
                    }
                })
                const newSnappoints = element.points.map(a => {
                    const fromEleTop = a.y - element.y
                    const fromEleLeft = a.x - element.x
                    return {
                        ...a,
                        x: newX + fromLeft + fromEleLeft,
                        y: newY + fromTop + fromEleTop
                    }
                })
                return {
                    ...element,
                    id: nanoid(),
                    x: newX + fromLeft,
                    y: newY + fromTop,
                    points: newppoints,
                    SnapshotPoints: newSnappoints
                }
            }
            return {
                ...element,
                id: nanoid(),
                x: newX + fromLeft,
                y: newY + fromTop
            }
        })
        const copy = fullCopyOfElements(Elements)
        copy.push(...finalArray)
        const dimentions = getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, [...finalArray])

        undoref.current.push({
            elements: copy,
            selectedElement: null,
            multipleSelectedElements: finalArray,
            multipleSelectedDimentions: dimentions ?? null
        })
        redoref.current = []
        clipboardRef.current = finalArray
        setElements(copy)
        setMultipleSelectedElements(finalArray)
    }
}


export function handleSelectToolBykeydown(
    e: KeyboardEvent,
    undoref: React.RefObject<historyBlock[]>,
    settool: Dispatch<SetStateAction<Tool>>,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
) {
    if (e.key === "v" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Cursor")
    }
    if (e.key === "r" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Rectangle")
    }
    if (e.key === "d" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Diamond")
    }
    if (e.key === "o" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Ellipse")
    }
    if (e.key === "a" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Arrow")
    }
    if (e.key === "l" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Line")
    }
    if (e.key === "p" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Freedraw")
    }
    if (e.key === "e" && !e.ctrlKey) {
        toolChangeHandler(setSelectedElement, Elements, setElements, undoref, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
        settool("Eraser")
    }

}