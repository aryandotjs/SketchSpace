import { Dispatch, SetStateAction } from "react"
import { Element } from "../lib/whiteboard/tools/types"


export const deleteElement = (
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    SelectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
) => {

    if (!SelectedElement) return
    const filtered = Elements.filter(a => a.id !== SelectedElement.id)
    setElements(filtered)
    setSelectedElement(null)
}