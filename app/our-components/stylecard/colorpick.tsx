import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dispatch, SetStateAction, useRef, useState } from "react"


const colors:string[] = ["#000000","#E03131","#2F9E44","#1971C2","#808080"]
const colors2: string[] = [
  "transparent",
   "#f8f9fa", "#6c757d", "#f1f3f5", "#fff4e6", "#fff9db", 
  "#c3fae8", "#d0ebff", "#e5dbff", "#fff0f6", "#e64980", "#ae3ec9", 
  "#7048e8", "#4c6ef5", "#22b8cf", "#0c8599", "#12b886", "#099268", 
  "#66a80f", "#fab005", "#f59f00", "#ff8787", "#fd7e14", "#d9480f", 
  "#862e9c", "#3e2723", "#0b3c5d", "#495057", "#343a40", "#212529"
];




export function ColorPick({
    color,
    setcolor,
    setElements,
    Elements,
    selectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    color:string,
    setcolor:Dispatch<SetStateAction<string>>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[],
    selectedElement: Element | null,
    undoref: React.RefObject<historyBlock[]>,
    redoref: React.RefObject<historyBlock[]>,
    MultipleSelectedElements: Element[] | null,
        DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    
}){
    const hexerrref = useRef<HTMLDivElement|null>(null)
    const [err , seterror] = useState<Record<string,string>>({})
    const Validatecolor = (hex:string)=>{
         const er:Record<string,string> = {}
         const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i;
         if (!hexRegex.test(hex)) {
            er.hex = "not a valid code"
         }
         seterror(er)
         return hexRegex.test(hex); 
    }

    function setSelectedElementsColor(color:string){
        if (color === "transparent") {
            color = "#00000000"
        }
        const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i;
        if ( hexRegex.test(color)) {
            changeStyleOfSelectedElements(color,"color",setElements,Elements,selectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
        }
        setcolor(color)
    }

     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke</Label>
               <div className="flex gap-1.5 items-center">
                   
                   {colors.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>setSelectedElementsColor(c)}
                     style={{backgroundColor : c}}
                     className={`h-5.5 w-5.5 rounded  ${color === c ?"ring-1  ring-offset-1" : ""}`}>
                     </div>
                   })}

                  <div className="border-l h-4 pl-1 ml-1 border-black/10"/>

                  
                 <Popover>
                    <PopoverTrigger render={
                        <button 
                            style={{   
                                background :  color === "transparent" 
                                ? "linear-gradient(45deg, #efefef 25%, transparent 25%), linear-gradient(-45deg, #efefef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #efefef 75%), linear-gradient(-45deg, transparent 75%, #efefef 75%)" 
                                : color ,
                            }}
                            className={`h-6 w-6 rounded border `}>
                        </button>
                   } />
                    <PopoverContent onClick={(a)=>{
                        if ( hexerrref && hexerrref.current?.contains(a.target as globalThis.Node) ) {
                            return
                        }
                        seterror({})}
                    }
                        side="right" sideOffset={25} className="w-80 translate-y-[90px] p-5 max-w-50">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label className="text-[10px] font-normal ">Colors</Label>
                                <div className="grid grid-cols-5 gap-1 ">
                                    {colors2.map((c)=>{
                                        return <div 
                                        key={c}
                                        onClick={()=>{
                                            setSelectedElementsColor(c)
                                        }}
                                        style={{   
                                            background :  c === "transparent" 
                                            ? "linear-gradient(45deg, #efefef 25%, transparent 25%), linear-gradient(-45deg, #efefef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #efefef 75%), linear-gradient(-45deg, transparent 75%, #efefef 75%)" 
                                            : c,
                                        }}
                                        className={`h-7 w-7 rounded-sm border ${color === c ?"ring-1  ring-offset-1" : ""}`}>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-[10px] font-normal ">Hex code</Label>
                                <div ref={hexerrref} className="relative">
                                   <Input value={color.replace("#","")} onKeyDown={(e)=>{
                                          e.stopPropagation()
                                   }} 
                                   onChange={(a)=>{
                                    if (Validatecolor(a.target.value)) {
                                        if (a.target.value[0] && a.target.value[0] === "#") {
                                            const c = a.target.value.replace("#","")
                                        }
                                    }
                                        setSelectedElementsColor("#" +  a.target.value)
                                    }} className={`px-10 text-[10px] focus-visible:ring-0  ${err.hex ? "border-red-500":""}`}></Input>
                                  <div className="absolute top-[6] left-4">#</div> 
                                   {err.hex &&
                                      <div className="text-[11px] text-red-500 my-2">{err?.hex}</div>
                                  } 
                                </div>
                            </div>
                        </div>
                     </PopoverContent>
                 </Popover>

               </div>
            </div>
}