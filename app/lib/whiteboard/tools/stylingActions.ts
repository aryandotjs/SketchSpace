import { Dispatch, SetStateAction } from "react";
import { BorderType, DimentionsMultipleSelectBox, Element, fillStyleEnum, historyBlock, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, resizeEleObjType, StrokeStyle } from "./types";
import { fullCopyOfElements, fullCopyOfSingleElement } from "@/app/helpers/helper";

type styleSupported = "color" | "width" | "style" | "opacity" | "border" | "bg" | "fillStyle"
const Widthset = new Set<string>(["1", "2.5", "4"])
const StyleStrokeset = new Set<StrokeStyle>([StrokeStyle.Solid, StrokeStyle.Dashed, StrokeStyle.Dotted])

export const changeStyleOfSelectedElements = (
    Unit: string,
    styleType: styleSupported,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[],
    selectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
) => {
    const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i

    if (selectedElement) {
        let SeEle: Element | null = null
        const EditedElements = Elements.map(a => {
            if (a.id === selectedElement.id) {

                if (styleType === "color" && hexRegex.test(Unit)) {
                    const EditedEle = {
                        ...a,
                        strokeColor: Unit
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "width" && Widthset.has(Unit)) {
                    const EditedEle = {
                        ...a,
                        strokeWidth: Number(Unit)
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "style" && StyleStrokeset.has(Unit as StrokeStyle)) {
                    const EditedEle = {
                        ...a,
                        strokeStyle: Unit as StrokeStyle
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "opacity" && Unit) {
                    const EditedEle = {
                        ...a,
                        opacity: Number(Unit)
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "border" && Unit) {
                    const EditedEle = {
                        ...a,
                        border: Unit as BorderType
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "bg" && Unit && a.type === "rectangle" && hexRegex.test(Unit)) {
                    const EditedEle = {
                        ...a,
                        backgroundColor: Unit
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
                if (styleType === "fillStyle" && Unit && a.type === "rectangle") {
                    const EditedEle = {
                        ...a,
                        fillStyle: Unit as fillStyleEnum
                    }
                    SeEle = EditedEle
                    return EditedEle
                }
            }
            return a
        })
        if (SeEle) {
            undoref.current.push({
                elements: fullCopyOfElements(EditedElements),
                selectedElement: fullCopyOfSingleElement(SeEle),
                multipleSelectedElements: null,
                multipleSelectedDimentions: null
            })
            redoref.current = []
            setSelectedElement(fullCopyOfSingleElement(SeEle))
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


