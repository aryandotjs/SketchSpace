import { Card } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { ColorPick } from "./colorpick";
import { BackgroundPick } from "./backgroundpick";
import { WidthPick } from "./widthpick";
import { OpacityPick } from "./opacitypick";
import { StrokeStylePick } from "./strokestyle";
import { ActionPick } from "./actions";
import { Element, StrokeStyle } from "@/app/lib/whiteboard/tools/types";



export function StyleCard(
   {  
      tool,

      strokeColor,
      setStrokecolor,

      strokeStyle,
      setstrokeStyle,

      backgroundcolor,
      setbackgroundcolor,

      setstrokeWidth,
      strokeWidth,
      
      setopacity,
      opacity,

      Elements,
      setElements,
      SelectedElement,
      setSelectedElement,
   } 
   :{ 
      tool:string

      strokeColor:string,
      setStrokecolor:Dispatch<SetStateAction<string>>

      strokeStyle:StrokeStyle,
      setstrokeStyle:Dispatch<SetStateAction<StrokeStyle>>

      backgroundcolor:string,
      setbackgroundcolor:Dispatch<SetStateAction<string>>

      strokeWidth:string,
      setstrokeWidth:Dispatch<SetStateAction<string>>

      opacity:number,
      setopacity:Dispatch<SetStateAction<number>>,

      Elements: Element[],
      setElements: Dispatch<SetStateAction<Element[]>>,
      SelectedElement: Element | null,
      setSelectedElement: Dispatch<SetStateAction<Element | null>>,
   }){
      
     return <div className=" w-50 absolute left-4 top-20 ">
          <Card  className="w-full max-w-sm px-2.5">

            <ColorPick setcolor={setStrokecolor} color={strokeColor}></ColorPick> 
            {/* <BackgroundPick setbg={setbackgroundcolor} bg={backgroundcolor}></BackgroundPick> */}

            {/* <Fillpick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth}></Fillpick>  */}

            <WidthPick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth}></WidthPick>
            <StrokeStylePick  setstrokeStyle={setstrokeStyle} strokeStyle={strokeStyle}></StrokeStylePick>

            {/* <BorderPick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth}></BorderPick> */}
               
            <OpacityPick  setopacity={setopacity} opacity={opacity}></OpacityPick>

            
            {/* { tool !== "Pencil" && tool !== "Ellipse" ?  */}
            <ActionPick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth} Elements={Elements} setElements={setElements} SelectedElement={SelectedElement} setSelectedElement={setSelectedElement} ></ActionPick> 
            {/* // : " "} */}
               
          </Card>
     </div>
} 





