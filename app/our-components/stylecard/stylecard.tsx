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
import { stylestroke } from "@/app/lib/whiteboard/tools/types";



export function StyleCard(
   {  
      tool,
      color,
      setcolor,

      styleofline,
      setstyleofline,

      bg,
      setbg,
      setwidth,
      width,
      setopacity,
      opacity
   } 
   :{ 
      tool:string
      color:string,
      setcolor:Dispatch<SetStateAction<string>>

      styleofline:stylestroke,
      setstyleofline:Dispatch<SetStateAction<stylestroke>>

      bg:string,
      setbg:Dispatch<SetStateAction<string>>
      width:string,
      setwidth:Dispatch<SetStateAction<string>>

      opacity:number,
      setopacity:Dispatch<SetStateAction<number>>
   }){
      
     return <div className=" w-50 absolute left-4 top-20 ">
          <Card  className="w-full max-w-sm px-2.5">

            <ColorPick setcolor={setcolor} color={color}></ColorPick> 
            <BackgroundPick setbg={setbg} bg={bg}></BackgroundPick>
            {/* <Fillpick setwidth={setwidth} width={width}></Fillpick> */}
            <WidthPick setwidth={setwidth} width={width}></WidthPick>
            <StrokeStylePick  setstyleofline={setstyleofline} styleofline={styleofline}></StrokeStylePick>

             {/* { tool !== "Pencil" ?
            <BorderPick setwidth={setwidth} width={width}></BorderPick>
            : ""} */}
               
            <OpacityPick  setopacity={setopacity} opacity={opacity}></OpacityPick>

            
            {/* { tool !== "Pencil" && tool !== "Ellipse" ?  */}
            <ActionPick setwidth={setwidth} width={width}></ActionPick> 
            {/* // : " "} */}
               
          </Card>
     </div>
} 





