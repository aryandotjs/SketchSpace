import { stylestroke } from "@/app/lib/whiteboard/tools/types"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"


const size:string[] = ["1","1.5","3"]

export function StrokeStylePick({
    styleofline,
    setstyleofline
}:{
    styleofline:stylestroke,
    setstyleofline:Dispatch<SetStateAction<stylestroke>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke style</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div 
                     onClick={()=>setstyleofline(stylestroke.Normal)}
                     className={`h-7 w-7 rounded-sm  ${styleofline === stylestroke.Normal ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-solid border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setstyleofline(stylestroke.Dashed)}
                     className={`h-7 w-7 rounded-sm  ${styleofline === stylestroke.Dashed ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dashed border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setstyleofline(stylestroke.ExtraDashed)}
                     className={`h-7 w-7 rounded-sm  ${styleofline === stylestroke.ExtraDashed ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dotted border-black"></div>
                    </div>
                  
               </div>
            </div>
}