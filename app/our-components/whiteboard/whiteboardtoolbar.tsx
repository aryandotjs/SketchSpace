import { Circle,
    RectangleHorizontal,
    Eraser, 
    Pencil,
    ArrowRight,  
    Lock,
    Diamond,
    Type,
    Image,
    Wand,
    MousePointer,
    Minus,
    Square,
    Hand,
    EllipsisVertical} from 'lucide-react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Dispatch, SetStateAction, useState } from 'react';
import { Tool } from '@/app/lib/whiteboard/tools';
import { AiMenuDropdown, MainMenuDropdown } from '../toolbar/Dropdowns';
import { DimentionsMultipleSelectBox, Element, historyBlock } from '@/app/lib/whiteboard/tools/types';
import { toolChangeHandler } from '@/app/interaction/selection/toolchange';

export function ToggleToolbar({
    settool,
    tool,
    setSelectedElement,
    Elements,
    setElements,
    undoref,
    setDimentionsMutipleSelectionBox,
    setMultipleSelectedElements
  }
  :{
    settool:Dispatch<SetStateAction<Tool>>,
    tool:string,
    setSelectedElement: Dispatch<SetStateAction<Element| null>>,
    Elements: Element[],
    setElements: Dispatch<SetStateAction<Element[]>>,
     undoref: React.RefObject<historyBlock[]>,
    setDimentionsMutipleSelectionBox: Dispatch<SetStateAction<DimentionsMultipleSelectBox | null>>,
    setMultipleSelectedElements: Dispatch<SetStateAction<Element[] | null>>,
  }) {
  return (
    <div className="absolute top-4 w-full flex justify-center pointer-events-none ">
        <div className=" bg-gray-600 border-[0.5px] p-1 h-12  w-min  border-black/10  item-center   rounded-lg pointer-events-auto flex shadow-[0_20px_20px_-10px_rgba(0,0,0,0.03)]">
            <div className=' flex items-center'>
              {/* <AiMenuDropdown ></AiMenuDropdown> */}
            </div>
            <ToggleGroup spacing={2} value={[tool]} >

              {/* <ToggleGroupItem onClick={()=>{
                    toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                    settool("Lock")
                  }} value="Lock" aria-label="Toggle strikethrough">
                  <Lock/>
                </ToggleGroupItem>

                <div className="border-l h-5 border-black/10"/>  */}

                {/* <ToggleGroupItem onClick={()=>{
                    toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                    settool("Pan")
                  }} value="Pan" aria-label="Toggle strikethrough">
                  <Hand  />
                </ToggleGroupItem> */}

                <ToggleGroupItem className={"relative"} onClick={()=>{
                    toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                    settool("Cursor")
                  }} 
                  value="Cursor" aria-label="Toggle strikethrough">
                  <MousePointer strokeWidth={1.5}  fill={tool === "Cursor" ? "#000" : "#fff"} />
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>V</div>

                </ToggleGroupItem>

                <ToggleGroupItem className={"relative"} onClick={()=>{
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  settool("Rectangle")
                 }}  value="Rectangle" aria-label="Toggle strikethrough">
                  <Square  strokeWidth={1.5}  fill={tool === "Rectangle" ? "#000" : "#fff"}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>R</div>
                </ToggleGroupItem>
{/* 
                <ToggleGroupItem className={"relative"} onClick={()=>{
                  settool("Diamond")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Diamond" aria-label="Toggle strikethrough">
                  <Diamond  strokeWidth={1.5}  fill={tool === "Diamond" ? "#000" : "#fff"}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>D</div>

                </ToggleGroupItem>

                <ToggleGroupItem className={"relative"} onClick={()=>{
                  settool("Ellipse")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Ellipse" aria-label="Toggle italic">
                  <Circle  strokeWidth={1.5}  fill={tool === "Ellipse" ? "#000" : "#fff"}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>O</div>

                </ToggleGroupItem>

                <ToggleGroupItem className={"relative"} onClick={()=>{
                  settool("Arrow")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Arrow" aria-label="Toggle strikethrough">
                  <ArrowRight  strokeWidth={1.5}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>A</div>

                </ToggleGroupItem> */}
                
                {/* <ToggleGroupItem className={"relative"} onClick={()=>{
                  settool("Line")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Line" aria-label="Toggle strikethrough">
                  <Minus  strokeWidth={1.5}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>L</div>

                </ToggleGroupItem>

                <ToggleGroupItem className={"relative"}onClick={()=>{
                  settool("Freedraw")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Freedraw" aria-label="Toggle bold" >
                  <Pencil  strokeWidth={1.5}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>P</div>

                </ToggleGroupItem> */}

                {/* <ToggleGroupItem onClick={()=>settool("Text")} value="Text" aria-label="Toggle strikethrough">
                  <Type  strokeWidth={1.5}/>
                </ToggleGroupItem> */}
                {/* <ToggleGroupItem onClick={()=>settool("Image")} value="Image" aria-label="Toggle strikethrough">
                  <Image  strokeWidth={1.5}/>
                </ToggleGroupItem>  */}

                {/* <ToggleGroupItem className={"relative"} onClick={()=>{
                  settool("Eraser")
                  toolChangeHandler(setSelectedElement,Elements,setElements,undoref,setDimentionsMutipleSelectionBox,setMultipleSelectedElements)
                  }} value="Eraser" aria-label="Toggle strikethrough">
                  <Eraser  strokeWidth={1.5}/>
                  <div className='absolute bottom-[-1] right-0.5 text-[12px]'>E</div>

                </ToggleGroupItem> */}

                {/* <div className="border-l h-5 mx-1 border-black/10"/> */}
               
                
              
                {/* <ToggleGroupItem onClick={()=>settool("Menu")} value="Menu" aria-label="Toggle strikethrough">
                  <Wand/>
                </ToggleGroupItem>   */}
            
            </ToggleGroup>
            <div className=' flex items-center'>
              {/* <MainMenuDropdown></MainMenuDropdown> */}
            </div>
        </div>
  </div>
    
  )
}
