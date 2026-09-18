import { Card } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { ColorPick } from "./colorpick";
import { BackgroundPick } from "./backgroundpick";
import { WidthPick } from "./widthpick";
import { OpacityPick } from "./opacitypick";
import { StrokeStylePick } from "./strokestyle";
import { ActionPick } from "./actions";
import { BorderType, DimentionsMultipleSelectBox, Element, historyBlock, StrokeStyle } from "@/app/lib/whiteboard/tools/types";
import { BorderPick } from "./borderpick";



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

      border,
      setborder,

      Elements,
      setElements,
      SelectedElement,
      setSelectedElement,
      undoref,
      redoref,
      MultipleSelectedElements,
      DimentionsMutipleSelectionBox,
      setMultipleSelectedElements,
      setDimentionsMutipleSelectionBox
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

      border:BorderType
      setborder:Dispatch<SetStateAction<BorderType>>

      Elements: Element[],
      setElements: Dispatch<SetStateAction<Element[]>>,
      SelectedElement: Element | null,
      setSelectedElement: Dispatch<SetStateAction<Element | null>>,
      undoref: React.RefObject<historyBlock[]>,
      redoref: React.RefObject<historyBlock[]>,
      MultipleSelectedElements: Element[] | null,
      DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
      setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
      setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    

   }){
      
     return <div className=" w-50 absolute left-4 top-20 ">
          <Card  className="w-full max-w-sm px-2.5">

            <ColorPick  color={strokeColor} setcolor={setStrokecolor} setElements={setElements} Elements={Elements} selectedElement={SelectedElement} undoref={undoref} redoref={redoref} MultipleSelectedElements={MultipleSelectedElements} DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox} ></ColorPick> 
            {/* <BackgroundPick setbg={setbackgroundcolor} bg={backgroundcolor}></BackgroundPick> */}

            {/* <Fillpick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth}></Fillpick>  */}

            <WidthPick setstrokeWidth={setstrokeWidth} strokeWidth={strokeWidth}  setElements={setElements} Elements={Elements} selectedElement={SelectedElement} undoref={undoref} redoref={redoref} MultipleSelectedElements={MultipleSelectedElements} DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox}></WidthPick>
            <StrokeStylePick  setstrokeStyle={setstrokeStyle} strokeStyle={strokeStyle} setElements={setElements} Elements={Elements} selectedElement={SelectedElement} undoref={undoref} redoref={redoref} MultipleSelectedElements={MultipleSelectedElements} DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox}></StrokeStylePick>

            <BorderPick border={border} setborder={setborder}></BorderPick>
               
            <OpacityPick   opacity={opacity}  setopacity={setopacity}  setElements={setElements} Elements={Elements} selectedElement={SelectedElement} undoref={undoref} redoref={redoref} MultipleSelectedElements={MultipleSelectedElements} DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox}></OpacityPick>
            
            {/* { tool !== "Pencil" && tool !== "Ellipse" ?  */}
            <ActionPick 
               strokeWidth={strokeWidth}
               setstrokeWidth={setstrokeWidth}
               Elements={Elements}
               setElements={setElements}
               SelectedElement={SelectedElement}
               setSelectedElement={setSelectedElement}
               MultipleSelectedElements={MultipleSelectedElements}
               setMultipleSelectedElements={setMultipleSelectedElements}
               DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox}
               setDimentionsMutipleSelectionBox={setDimentionsMutipleSelectionBox}
                undoref={undoref} 
                redoref={redoref}
               ></ActionPick> 


            {/* // : " "} */}
               
          </Card>
     </div>
} 





