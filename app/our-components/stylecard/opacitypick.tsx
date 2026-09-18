import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"



export function OpacityPick({
    opacity,
    setopacity,
     Elements,
    setElements,
    selectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    opacity:number,
    setopacity:Dispatch<SetStateAction<number>>,
     Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
    selectedElement: Element | null,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Opacity</Label>
               <div className="flex flex-col gap-3">
                   <Slider value={opacity} onValueChange={(a)=>{
                    setopacity(Number(a))
                    if (a === 0 || a === 10 || a === 20 ||a === 30 ||a === 40 ||a === 50 ||a === 60 ||a === 70 ||a === 80 ||a === 90 ||a === 100 ) {
                        changeStyleOfSelectedElements(opacity.toString(),"opacity",setElements,Elements,selectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                    }
                    }}></Slider>
                   <div className="flex justify-between text-[11px] ">
                     <div>{opacity}</div>
                     <div>10</div>
                   </div>
               </div>
            </div>
}