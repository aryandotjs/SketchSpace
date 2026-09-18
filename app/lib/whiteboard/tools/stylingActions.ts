import { Dispatch, SetStateAction } from "react";
import { DimentionsMultipleSelectBox, Element, historyBlock, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, resizeEleObjType, StrokeStyle } from "./types";
import { fullCopyOfElements, fullCopyOfSingleElement } from "@/app/helpers/helper";

type styleSupported = "color" | "width" | "style" | "opacity" | "border"
const Widthset = new Set<string>(["1", "2.5", "4"])
const StyleStrokeset = new Set<StrokeStyle>([StrokeStyle.Solid, StrokeStyle.Dashed, StrokeStyle.Dotted])

export const changeStyleOfSelectedElements = (
    Unit: string,
    styleType: styleSupported,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[],
    selectedElement: Element | null,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
) => {
    const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i

    if (selectedElement) {
        let change = false
        const EditedElements = Elements.map(a => {
            if (a.id === selectedElement.id) {
                if (styleType === "color" && hexRegex.test(Unit)) {
                    change = true
                    return {
                        ...a,
                        strokeColor: Unit
                    }
                }
                if (styleType === "width" && Widthset.has(Unit)) {
                    change = true
                    return {
                        ...a,
                        strokeWidth: Number(Unit)
                    }
                }
                if (styleType === "style" && StyleStrokeset.has(Unit as StrokeStyle)) {
                    change = true
                    return {
                        ...a,
                        strokeStyle: Unit as StrokeStyle
                    }
                }
                if (styleType === "opacity" && Unit) {
                    change = true
                    return {
                        ...a,
                        opacity: Number(Unit)
                    }
                }
            }
            return a
        })
        if (change) {
            undoref.current.push({
                elements: fullCopyOfElements(EditedElements),
                selectedElement: fullCopyOfSingleElement(selectedElement),
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setElements(EditedElements)
        }
    }
    // if (MultipleSelectedElements) {
    //     const newSet = new Set(MultipleSelectedElements.map(a => a.id))
    //     const EditedElements = Elements.map(a => {
    //         if (newSet.has(a.id)) {
    //             return {
    //                 ...a,
    //                 strokeColor: Color
    //             }
    //         }
    //         return a
    //     })
    //     undoref.current.push({
    //         elements: fullCopyOfElements(EditedElements),
    //         selectedElement: null,
    //         multipleSelectedElements: fullCopyOfElements(MultipleSelectedElements),
    //         multipleSelectedDimentions: DimentionsMutipleSelectionBox ? { ...DimentionsMutipleSelectionBox } : null
    //     })
    //     redoref.current = []
    //     setElements(EditedElements)
    // }

}


