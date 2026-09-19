

import { changeStyleOfSelectedElements } from "@/app/lib/whiteboard/tools/stylingActions"
import { DimentionsMultipleSelectBox, Element, historyBlock } from "@/app/lib/whiteboard/tools/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dispatch, SetStateAction, useRef, useState } from "react"

const background:string[] = ["#ffc9c9","#b2f2bb","#a5d8ff","#ffec99","#808080"]

const colors2: string[] = [
  "transparent", "#fff9db", "#fff4e6", "#f1f3f5", "#f8f9fa", "#e5dbff", 
  "#fff0f6", "#ffc9c9", "#ff8787", "#fd7e14", "#d9480f", "#fab005", 
  "#ffec99", "#f59f00", "#66a80f", "#b2f2bb", "#c3fae8", "#12b886", 
  "#099268", "#0c8599", "#22b8cf", "#a5d8ff", "#d0ebff", "#4c6ef5", 
  "#7048e8", "#ae3ec9", "#e64980", "#862e9c", "#3e2723", "#0b3c5d"
];


export function BackgroundPick({
    bg,
    setbg,
     setElements,
    Elements,
    selectedElement,
    setSelectedElement,
    undoref,
    redoref,
    MultipleSelectedElements,
    DimentionsMutipleSelectionBox
}:{
    bg:string,
    setbg:Dispatch<SetStateAction<string>>,
    setElements: Dispatch<SetStateAction<Element[]>>,
    Elements: Element[],
    selectedElement: Element | null,
    setSelectedElement: Dispatch<SetStateAction<Element | null>>,
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
     function setSelectedElementsColor(Bg:string){
            if (Bg === "transparent") {
                Bg = "#00000000"
            }
            const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i;
            if ( hexRegex.test(Bg)) {
                changeStyleOfSelectedElements(Bg,"bg",setElements,Elements,selectedElement,setSelectedElement,undoref,redoref,MultipleSelectedElements,DimentionsMutipleSelectionBox)
            }
            setbg(Bg)
        }

     return  <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Background</Label>
               <div className="flex gap-1.5 items-center">
                   
                   {background.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>setSelectedElementsColor(c)}
                     style={{backgroundColor : c}}
                     className={`h-5.5 w-5.5 rounded  ${bg === c ?"ring-1  ring-offset-1" : ""}`}>
                     </div>
                   })}

                  <div className="border-l h-4 pl-1 ml-1 border-black/10"/>

                    <Popover>
                                    <PopoverTrigger render={
                                        <button 
                                            style={{   
                                                background :  bg === "transparent" 
                                                ? "linear-gradient(45deg, #efefef 25%, transparent 25%), linear-gradient(-45deg, #efefef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #efefef 75%), linear-gradient(-45deg, transparent 75%, #efefef 75%)" 
                                                : bg ,
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
                                                        onClick={()=>setSelectedElementsColor(c)}
                                                        style={{   
                                                            background :  c === "transparent" 
                                                            ? "linear-gradient(45deg, #efefef 25%, transparent 25%), linear-gradient(-45deg, #efefef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #efefef 75%), linear-gradient(-45deg, transparent 75%, #efefef 75%)" 
                                                            : c,
                                                        }}
                                                        className={`h-7 w-7 rounded-sm border ${bg === c ?"ring-1  ring-offset-1" : ""}`}>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="text-[10px] font-normal ">Hex code</Label>
                                                <div ref={hexerrref} className="relative">
                                                    <Input value={bg.replace("#","")} onChange={(a)=>{
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