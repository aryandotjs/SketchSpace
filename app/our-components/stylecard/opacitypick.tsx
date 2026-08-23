import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Minus } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"



export function OpacityPick({
    opacity,
    setopacity
}:{
    opacity:number,
    setopacity:Dispatch<SetStateAction<number>>
}){
     return <div className="gap-2.5 flex flex-col ">
               <Label className="text-[10px] font-normal ">Opacity</Label>
               <div className="flex flex-col gap-3">
                   <Slider value={opacity} onValueChange={(a)=>{setopacity(Number(a))}}></Slider>
                   <div className="flex justify-between text-[11px] ">
                     <div>0</div>
                     <div>10</div>
                   </div>
               </div>
            </div>
}