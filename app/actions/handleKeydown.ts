import React, { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, historyBlock, Point } from "../lib/whiteboard/tools/types";
import { copyElementandElements, deleteElement, DuplicateElementOrElements, handleSelectToolBykeydown, PasteElementOrElements } from "./elementActions";
import { hitTest } from "../geometry/hitTest";
import { Tool } from "../lib/whiteboard/tools";
import { getMultipleSectionsDimentionsSecondary } from "../interaction/selection/selection";
import { toolChangeHandler } from "../interaction/selection/toolchange";
import { Key } from "lucide-react";
import { fullCopyOfElements, fullCopyOfSingleElement } from "../helpers/helper";

export const handleKeydown = (
    e: KeyboardEvent,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
    clipboardRef: React.RefObject<Element[] | null>,
    currentPointRef: React.RefObject<Point | null>,
    settool: Dispatch<SetStateAction<Tool>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>

) => {

    handleSelectToolBykeydown(e, undoref, settool, Elements, setElements, setSelectedElement, setDimentionsMutipleSelectionBox, setMultipleSelectedElements)
    if (e.key === "s" && e.ctrlKey) {
        e.preventDefault()
    }
    if (e.key === "Delete" || e.key === "Backspace" || e.key === "x" && e.ctrlKey) {
        deleteElement(Elements,
            setElements,
            SelectedElement,
            setSelectedElement,
            MultipleSelectedElements,
            setMultipleSelectedElements,
            setDimentionsMutipleSelectionBox,
            undoref,
            redoref
        )
    }

    if (e.key === "d" && e.ctrlKey) {
        e.preventDefault()
        DuplicateElementOrElements(Elements,
            setElements,
            SelectedElement,
            setSelectedElement,
            MultipleSelectedElements,
            setMultipleSelectedElements,
            DimentionsMutipleSelectionBox,
            setDimentionsMutipleSelectionBox,
            undoref,
            redoref
        )
    }

    if (e.key === "c" && e.ctrlKey) {
        copyElementandElements(
            SelectedElement,
            MultipleSelectedElements,
            clipboardRef)
    }
    if (e.key === "v" && e.ctrlKey) {
        PasteElementOrElements(Elements,
            DimentionsMutipleSelectionBox,
            setElements,
            setSelectedElement,
            setMultipleSelectedElements,
            setDimentionsMutipleSelectionBox,
            clipboardRef,
            currentPointRef,
            undoref,
            redoref)
    }

    if (e.key === "a" && e.ctrlKey) {
        e.preventDefault()
        if (Elements.length === 1 && !SelectedElement) {
            const copy = fullCopyOfElements(Elements)
            const copyELement = fullCopyOfSingleElement(copy[0])
            undoref.current.push({
                elements: copy,
                selectedElement: copyELement,
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setSelectedElement(Elements[0])
        }
        if (Elements.length > 1) {
            const copy = fullCopyOfElements(Elements)
            const dimentions = getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, copy)
            undoref.current.push({
                elements: copy,
                selectedElement: null,
                multipleSelectedElements: copy,
                multipleSelectedDimentions: dimentions ?? null
            })
            setSelectedElement(null)
            setMultipleSelectedElements(copy)
        }
        settool("Cursor")
    }

    if (e.key === "z" && e.ctrlKey) {
        if (undoref.current && undoref.current.length > 1) {
            const LastEle = undoref.current.pop()
            if (LastEle) {
                redoref.current.push(LastEle)
            }
            const length = undoref.current.length
            const curr = undoref.current[length - 1].elements
            const crrHistoryObj = undoref.current[length - 1]
            let currSelEle = crrHistoryObj.selectedElement
            const copycurr = fullCopyOfElements(curr)
            if (currSelEle) {
                currSelEle = fullCopyOfSingleElement(currSelEle)
            }

            setElements(copycurr)
            setSelectedElement(currSelEle)
            setMultipleSelectedElements(crrHistoryObj.multipleSelectedElements)
            setDimentionsMutipleSelectionBox(crrHistoryObj.multipleSelectedDimentions)
            return
        }
        if (undoref.current && undoref.current.length === 1) {
            const LastEle = undoref.current.pop()
            if (LastEle) {
                redoref.current.push(LastEle)
            }
            setElements([])
            setSelectedElement(null)
        }
    }
    if (e.key === "y" && e.ctrlKey) {
        if (redoref.current.length === 0) {
            return
        }
        const popped = redoref.current.pop()
        if (popped) {
            undoref.current.push(popped)
            setElements(popped.elements)
            setSelectedElement(popped.selectedElement)
            setMultipleSelectedElements(popped.multipleSelectedElements)
            setDimentionsMutipleSelectionBox(popped.multipleSelectedDimentions)
        }
    }
}