import { Label } from "@/components/ui/label"
import { SquareRoundCorner , Square } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

const size:string[] = ["1","1.5"]

export function BorderPick({
    width,
    setwidth
}:{
    width:string,
    setwidth:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Edges</Label>
               <div className="flex gap-2.5 items-center">
                   
                   {size.map((c)=>{
                     return <div 
                     key={c}
                     onClick={()=>setwidth(c)}
                     style={{backgroundColor : c}}
                     className={`h-7 w-7 rounded-sm  ${width == c ? "bg-[#F5F5F5]" : ""} flex justify-center items-center`}>
                            {c === "1" ? <Square strokeWidth={1.5} size={14}></Square> : <SquareRoundCorner strokeWidth={1.5} size={14}></SquareRoundCorner>}
                     </div>
                   })}
                  
               </div>

               
            </div>
}