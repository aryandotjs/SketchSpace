import { StrokeStyle } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"



export function StrokeStylePick({
    strokeStyle,
    setstrokeStyle
}:{
    strokeStyle:StrokeStyle,
    setstrokeStyle:Dispatch<SetStateAction<StrokeStyle>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke style</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div 
                     onClick={()=>setstrokeStyle(StrokeStyle.Solid)}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Solid ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-solid border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setstrokeStyle(StrokeStyle.Dashed)}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Dashed ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dashed border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setstrokeStyle(StrokeStyle.Dotted)}
                     className={`h-7 w-7 rounded-sm  ${strokeStyle === StrokeStyle.Dotted ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dotted border-black"></div>
                    </div>
                  
               </div>
            </div>
}