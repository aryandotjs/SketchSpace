import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { DimentionsMultipleSelectBox, Element, fillStyleEnum, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


const size:fillStyleEnum[] = [fillStyleEnum.Hachure,fillStyleEnum.CrossHatch,fillStyleEnum.Solid]

export function Fillpick
({
    fillType,
    setfillType,
    Elements,
    setElements,
    selectedElement,
    setSelectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    
    fillType:fillStyleEnum,
    setfillType:Dispatch<SetStateAction<fillStyleEnum>>,
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
               <Label className="text-[10px] font-normal ">Fill {fillType}</Label>
               <div className="flex gap-2.5 items-center">
                   
                   {size.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>{
                            setfillType(c)
                            changeStyleOfSelectedElements(c,"fillStyle",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                    }}
                     style={{backgroundColor : c}}
                     className={`h-7 w-7 rounded-sm  ${fillType === c ? "bg-gray-400" : ""} flex justify-center items-center`}>
                        {c === fillStyleEnum.Hachure ?
                        <div className="h-3.5 w-3.5 border border-black rounded  bg-[repeating-linear-gradient(135deg,#000,#000_1px,transparent_1px,transparent_2.5px)] "></div>
                        : c === fillStyleEnum.CrossHatch ? 
                        <div className="h-3.5 w-3.5 border border-black rounded bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_3px),repeating-linear-gradient(135deg,#000,#000_1px,transparent_1px,transparent_3px)]"></div>

                        : c === fillStyleEnum.Solid ? 
                        <div className="h-3.5 w-3.5 border border-black rounded  bg-black " ></div>
                         : ""}
                     </div>
                   })}
                  
               </div>
            </div>
}