import { Label } from "@/components/ui/label"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


const size:string[] = ["1","1.5","3"]

export function StrokeStylePick({
    width,
    setwidth
}:{
    width:string,
    setwidth:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Stroke style</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div 
                     onClick={()=>setwidth("1")}
                     className={`h-7 w-7 rounded-sm  ${width == "1" ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-solid border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setwidth("2")}
                     className={`h-7 w-7 rounded-sm  ${width == "2" ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dashed border-black"></div>
                    </div>

                    <div 
                     onClick={()=>setwidth("3")}
                     className={`h-7 w-7 rounded-sm  ${width == "3" ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                        <div className="border-t-2 w-4 border-dotted border-black"></div>
                    </div>
                  
               </div>
            </div>
}