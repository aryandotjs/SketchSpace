import { DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Dispatch, SetStateAction } from "react"



export const toolChangeHandler = (
    setSelectedElement: Dispatch<SetStateAction<Element | null>>, Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    undoref: React.RefObject<historyBlock[]>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,

) => {
    setSelectedElement(null)
    setDimentionsMutipleSelectionBox(null)
    setMultipleSelectedElements(null)
}