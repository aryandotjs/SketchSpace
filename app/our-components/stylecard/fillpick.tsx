import { Label } from "@/components/ui/label"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


const size:string[] = ["hatch","crosshatch","solid"]

export function Fillpick
({
    strokeWidth,
    setstrokeWidth
}:{
    strokeWidth:string,
    setstrokeWidth:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Fill</Label>
               <div className="flex gap-2.5 items-center">
                   
                   {size.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>setstrokeWidth(c)}
                     style={{backgroundColor : c}}
                     className={`h-7 w-7 rounded-sm  ${strokeWidth == c ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        {c === "hatch" ?
                        <div className="h-3.5 w-3.5 border border-black rounded  bg-[repeating-linear-gradient(135deg,#000,#000_1px,transparent_1px,transparent_2.5px)] "></div>
                        : c === "crosshatch" ? 
                        <div className="h-3.5 w-3.5 border border-black rounded bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_3px),repeating-linear-gradient(135deg,#000,#000_1px,transparent_1px,transparent_3px)]"></div>

                        : c === "solid" ? 
                        <div className="h-3.5 w-3.5 border border-black rounded  bg-black " ></div>
                         : ""}
                     </div>
                   })}
                  
               </div>
            </div>
}