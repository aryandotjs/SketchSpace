import { Card } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { ColorPick } from "./colorpick";
import { BackgroundPick } from "./backgroundpick";
import { WidthPick } from "./widthpick";
import { OpacityPick } from "./opacitypick";
import { StrokeStylePick } from "./strokestyle";
import { BorderPick } from "./borderpick";
import { ActionPick } from "./actions";
import { Fillpick } from "./fillpick";



export function StyleCard(
   {
      color,
      setcolor,
      bg,
      setbg,
      setwidth,
      width,
      setopacity,
      opacity
   } 
   :{
      color:string,
      setcolor:Dispatch<SetStateAction<string>>
      bg:string,
      setbg:Dispatch<SetStateAction<string>>
      width:string,
      setwidth:Dispatch<SetStateAction<string>>
      opacity:string,
      setopacity:Dispatch<SetStateAction<string>>
   }){
      
   
     return <div className=" w-50 absolute left-4 top-20 ">
          <Card  className="w-full max-w-sm px-2.5">

            <ColorPick setcolor={setcolor} color={color}></ColorPick> 
            <BackgroundPick setbg={setbg} bg={bg}></BackgroundPick>
            <Fillpick setwidth={setwidth} width={width}></Fillpick>
            <WidthPick setwidth={setwidth} width={width}></WidthPick>
            <StrokeStylePick  setwidth={setwidth} width={width}></StrokeStylePick>
            <BorderPick setwidth={setwidth} width={width}></BorderPick>
            <OpacityPick  setopacity={setopacity} opacity={opacity}></OpacityPick>
            <ActionPick setwidth={setwidth} width={width}></ActionPick>
               
          </Card>
     </div>
} 





