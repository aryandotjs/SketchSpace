import React, { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, Point } from "../lib/whiteboard/tools/types";
import { copyElementandElements, deleteElement, DuplicateElementOrElements, PasteElementOrElements } from "./elementActions";
import { hitTest } from "../geometry/hitTest";
import { Tool } from "../lib/whiteboard/tools";
import { getMultipleSectionsDimentionsSecondary } from "../interaction/selection/selection";

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
    settool: Dispatch<SetStateAction<Tool>>
) => {

    if (e.key === "Delete" || e.key === "Backspace" || e.key === "x" && e.ctrlKey) {
        deleteElement(Elements, setElements, SelectedElement, setSelectedElement, MultipleSelectedElements, setMultipleSelectedElements, setDimentionsMutipleSelectionBox)
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
            setDimentionsMutipleSelectionBox
        )
    }

    if (e.key === "c" && e.ctrlKey) {
        copyElementandElements(
            SelectedElement,
            MultipleSelectedElements,
            clipboardRef)
    }

    if (e.key === "v" && e.ctrlKey) {
        PasteElementOrElements(DimentionsMutipleSelectionBox, setElements, setSelectedElement, setMultipleSelectedElements, setDimentionsMutipleSelectionBox, clipboardRef, currentPointRef)
    }
    // if (e.key === "r") {
    //     settool("Rectangle")
    // }

    if (e.key === "a" && e.ctrlKey) {
        e.preventDefault()
        setMultipleSelectedElements([...Elements])
        getMultipleSectionsDimentionsSecondary(setDimentionsMutipleSelectionBox, [...Elements])
    }

}