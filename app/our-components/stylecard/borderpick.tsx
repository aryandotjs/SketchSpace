import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { BorderType, DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { SquareRoundCorner , Square } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

const rediusstyle = ["default","rounded"]
export function BorderPick({
    border,
    setborder,
     setElements,
    Elements,
    selectedElement,
    setSelectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    border:BorderType,
    setborder:Dispatch<SetStateAction<BorderType>>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[],
    selectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Edges</Label>
               <div className="flex gap-2.5 items-center">
                   
                   {rediusstyle.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>{
                      if(c === "default"){
                          setborder("default")
                          changeStyleOfSelectedElements("default","border",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                      }
                      if(c === "rounded"){
                          setborder("rounded")
                          changeStyleOfSelectedElements("rounded","border",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
                      }
                    }}
                     className={`h-7 w-7 rounded-sm  ${border == c ? "bg-gray-400" : ""} flex justify-center items-center`}>
                            {c === "default" ? <Square strokeWidth={1.5} size={14}></Square> : "" } 
                            {c === "rounded" ?  <SquareRoundCorner strokeWidth={1.5} size={14}></SquareRoundCorner> : ""}
                     </div>
                   })}
                  
               </div>

               
            </div>
}