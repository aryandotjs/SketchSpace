import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { DimentionsMultipleSelectBox, Element, historyBlock, StrokeStyle } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"



export function StrokeStylePick({
    strokeStyle,
    setstrokeStyle,
    Elements,
    setElements,
    selectedElement,
    setSelectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    strokeStyle:StrokeStyle,
    setstrokeStyle:Dispatch<SetStateAction<StrokeStyle>>,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    selectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke style</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div 
                     onClick={()=>{
                        setstrokeStyle(StrokeStyle.Solid)
                        changeStyleOfSelectedElements(StrokeStyle.Solid,"style",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                    }}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Solid ? "bg-gray-400" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-solid border-black"></div>
                    </div>

                    <div 
                     onClick={()=>{
                        setstrokeStyle(StrokeStyle.Dashed)
                        changeStyleOfSelectedElements(StrokeStyle.Dashed,"style",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                    }}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Dashed ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dashed border-black"></div>
                    </div>

                    <div 
                     onClick={()=>{
                        setstrokeStyle(StrokeStyle.Dotted)
                        changeStyleOfSelectedElements(StrokeStyle.Dotted,"style",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                    }}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Dotted ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dotted border-black"></div>
                    </div>
                  
               </div>
            </div>
}