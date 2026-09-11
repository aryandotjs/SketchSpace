import { Dispatch, SetStateAction } from "react";
import { Element } from "../lib/whiteboard/tools/types";
import { deleteElement } from "./elementActions";

export const handleKeydown = (
    e: KeyboardEvent,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
) => {
    if (e.key === "Delete" || e.key === "Backspace") {
        deleteElement(Elements, setElements, SelectedElement, setSelectedElement)
    }
}