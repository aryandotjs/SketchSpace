import { Label } from "@/components/ui/label"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


const size:string[] = ["1","2.5","4"]

export function WidthPick({
    strokeWidth,
    setstrokeWidth
}:{
    strokeWidth:string,
    setstrokeWidth:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke Width</Label>
               <div className="flex gap-2.5 items-center">
                   
                   {size.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>setstrokeWidth(c)}
                     style={{backgroundColor : c}}
                     className={`h-7 w-7 rounded-sm  ${strokeWidth == c ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <Minus strokeWidth={c === "1" ? 1 : c === "2.5" ? 2 : c === "4" ? 3 : "1" }></Minus>
                     </div>
                   })}
                  
               </div>
            </div>
}