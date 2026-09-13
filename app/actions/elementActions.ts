import { Dispatch, SetStateAction } from "react"
import { DimentionsMultipleSelectBox, Element } from "../lib/whiteboard/tools/types"


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