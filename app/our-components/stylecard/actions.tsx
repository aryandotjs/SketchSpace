import { deleteElement, DuplicateElementOrElements } from "@/app/actions/elementActions"
import { DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Trash2 , Copy} from "lucide-react"
import { Dispatch, SetStateAction } from "react"



export function ActionPick({
    strokeWidth,
    setstrokeWidth,
    Elements,
    setElements,
    SelectedElement,
    setSelectedElement,
    MultipleSelectedElements,
    setMultipleSelectedElements,
    DimentionsMutipleSelectionBox,
    setDimentionsMutipleSelectionBox,
    undoref,
    redoref
}:{
    strokeWidth:string,
    setstrokeWidth:Dispatch<SetStateAction<string>>,
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
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Actions</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div onClick={()=>{
                        DuplicateElementOrElements(
                            Elements,
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
                    }} className={`h-7 w-7 rounded-sm  hover:bg-[#F5F5F5] flex justify-center items-center`}>
                        <Copy size={15} strokeWidth={1.5}></Copy>
                     </div>
                  
                    <div
                    onClick={()=>{
                        deleteElement(
                            Elements,
                            setElements,
                            SelectedElement,
                            setSelectedElement,
                            MultipleSelectedElements,
                            setMultipleSelectedElements,
                            setDimentionsMutipleSelectionBox,
                            undoref,
                            redoref
                        )
                    }} 
                     className={`h-7 w-7 rounded-sm  hover:bg-[#F5F5F5] flex justify-center items-center`}>
                        <Trash2 size={15} strokeWidth={1.5}></Trash2>
                     </div>
               </div>
            </div>
}