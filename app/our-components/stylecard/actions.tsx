import { Label } from "@/components/ui/label"
import { Trash2 , Copy} from "lucide-react"
import { Dispatch, SetStateAction } from "react"



export function ActionPick({
    width,
    setwidth
}:{
    width:string,
    setwidth:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Actions</Label>
               <div className="flex gap-2.5 items-center">
                   
                    <div className={`h-7 w-7 rounded-sm  hover:bg-[#F5F5F5] flex justify-center items-center`}>
                        <Copy size={15} strokeWidth={1.5}></Copy>
                     </div>
                  
                    <div className={`h-7 w-7 rounded-sm  hover:bg-[#F5F5F5] flex justify-center items-center`}>
                        <Trash2 size={15} strokeWidth={1.5}></Trash2>
                     </div>
               </div>
            </div>
}