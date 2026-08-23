import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"



export function OpacityPick({
    opacity,
    setopacity
}:{
    opacity:string,
    setopacity:Dispatch<SetStateAction<string>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Opacity</Label>
               <div className="flex flex-col gap-3">
                   <Slider></Slider>
                   <div className="flex justify-between text-[11px] ">
                     <div>0</div>
                     <div>100</div>
                   </div>
               </div>
            </div>
}