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
    Hand} from 'lucide-react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Dispatch, SetStateAction, useState } from 'react';
import { Tool } from '@/app/lib/whiteboard/tools';
import { AiMenuDropdown } from '../toolbar/AimenuDropdown';

export function ToggleToolbar({settool,tool}:{settool:Dispatch<SetStateAction<Tool>>,tool:string}) {
  return (
    <div className="absolute top-4 w-full flex justify-center pointer-events-none">
        <div className="border p-1 w-min border-black/20  rounded-md pointer-events-auto flex">
            <AiMenuDropdown></AiMenuDropdown>
            <ToggleGroup spacing={1} >

            <div className="border-l ml-1 h-5 border-black/10"/> 

            {/* <ToggleGroupItem onClick={()=>settool("hand")} value="hand" aria-label="Toggle strikethrough">
              <Hand fill={tool === "hand" ? "#000" : "#FFF"} />
            </ToggleGroupItem> */}

            <ToggleGroupItem onClick={()=>settool("Cursor")} value="Cursor" aria-label="Toggle strikethrough">
              <MousePointer fill={tool === "Cursor" ? "#000" : "#FFF"} />
            </ToggleGroupItem>

            <ToggleGroupItem onClick={()=>settool("Rectangle")} value="Rectangle" aria-label="Toggle strikethrough">
              <Square fill={tool === "Rectangle" ? "#000" : "#FFF"}/>
            </ToggleGroupItem>

            <ToggleGroupItem onClick={()=>settool("Diamond")} value="Diamond" aria-label="Toggle strikethrough">
              <Diamond fill={tool === "Diamond" ? "#000" : "#FFF"}/>
            </ToggleGroupItem>

            <ToggleGroupItem onClick={()=>settool("Ellipse")} value="Ellipse" aria-label="Toggle italic">
              <Circle fill={tool === "Ellipse" ? "#000" : "#FFF"}/>
            </ToggleGroupItem>

            <ToggleGroupItem onClick={()=>settool("Arrow")} value="Arrow" aria-label="Toggle strikethrough">
              <ArrowRight/>
            </ToggleGroupItem>
            
            <ToggleGroupItem onClick={()=>settool("Line")} value="Line" aria-label="Toggle strikethrough">
              <Minus/>
            </ToggleGroupItem>

            <ToggleGroupItem onClick={()=>settool("Pencil")} value="Pencil" aria-label="Toggle bold" >
              <Pencil/>
            </ToggleGroupItem>



            <ToggleGroupItem onClick={()=>settool("Eraser")} value="Eraser" aria-label="Toggle strikethrough">
              <Eraser />
            </ToggleGroupItem>

            {/* <div className="border-l h-5 border-black/10"/>
            <ToggleGroupItem onClick={()=>settool("Text")} value="Text" aria-label="Toggle strikethrough">
              <Type/>
            </ToggleGroupItem>
            <ToggleGroupItem onClick={()=>settool("Image")} value="Image" aria-label="Toggle strikethrough">
              <Image/>
            </ToggleGroupItem>
           
            <ToggleGroupItem onClick={()=>settool("Lock")} value="Lock" aria-label="Toggle strikethrough">
              <Lock/>
            </ToggleGroupItem>
          
           <ToggleGroupItem onClick={()=>settool("Menu")} value="Menu" aria-label="Toggle strikethrough">
             <Wand/>
           </ToggleGroupItem>  */}
            
          </ToggleGroup>
        </div>
  </div>
    
  )
}
