import { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, Point } from "../lib/whiteboard/tools/types";
import { deleteElement } from "./elementActions";
import { hitTest } from "../geometry/hitTest";

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

) => {
    if (e.key === "Delete" || e.key === "Backspace") {
        deleteElement(Elements, setElements, SelectedElement, setSelectedElement, MultipleSelectedElements, setMultipleSelectedElements, setDimentionsMutipleSelectionBox)
    }

}