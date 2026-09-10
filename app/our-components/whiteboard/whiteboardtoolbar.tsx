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

export function ToggleToolbar({settool,tool}:{settool:Dispatch<SetStateAction<Tool>>,tool:string}) {
  return (
    <div className="absolute top-4 w-full flex justify-center pointer-events-none ">
        <div className=" bg-gray-600 border-[0.5px] p-1 h-11  w-min  border-black/10  item-center   rounded-md pointer-events-auto flex shadow-[0_20px_20px_-10px_rgba(0,0,0,0.03)]">
            <div className=' flex items-center'>
              {/* <AiMenuDropdown ></AiMenuDropdown> */}
            </div>
            <ToggleGroup spacing={1} >

                {/* <div className="border-l mx-1 h-5 border-black/10"/>  */}

                {/* <ToggleGroupItem onClick={()=>settool("hand")} value="hand" aria-label="Toggle strikethrough">
                  <Hand fill={tool === "hand" ? "#000" : "#F5F5F5"} />
                </ToggleGroupItem> */}

                <ToggleGroupItem onClick={()=>settool("Cursor")} value="Cursor" aria-label="Toggle strikethrough">
                  <MousePointer strokeWidth={1.5}  fill={tool === "Cursor" ? "#000" : "#fff"} />
                </ToggleGroupItem>

                <ToggleGroupItem onClick={()=>settool("Rectangle")}  value="Rectangle" aria-label="Toggle strikethrough">
                  <Square  strokeWidth={1.5}  fill={tool === "Rectangle" ? "#000" : "#fff"}/>
                </ToggleGroupItem>

                <ToggleGroupItem onClick={()=>settool("Diamond")} value="Diamond" aria-label="Toggle strikethrough">
                  <Diamond  strokeWidth={1.5}  fill={tool === "Diamond" ? "#000" : "#fff"}/>
                </ToggleGroupItem>

                <ToggleGroupItem onClick={()=>settool("Ellipse")} value="Ellipse" aria-label="Toggle italic">
                  <Circle  strokeWidth={1.5}  fill={tool === "Ellipse" ? "#000" : "#fff"}/>
                </ToggleGroupItem>

                <ToggleGroupItem onClick={()=>settool("Arrow")} value="Arrow" aria-label="Toggle strikethrough">
                  <ArrowRight  strokeWidth={1.5}/>
                </ToggleGroupItem>
                
                <ToggleGroupItem onClick={()=>settool("Line")} value="Line" aria-label="Toggle strikethrough">
                  <Minus  strokeWidth={1.5}/>
                </ToggleGroupItem>

                <ToggleGroupItem onClick={()=>settool("Freedraw")} value="Pencil" aria-label="Toggle bold" >
                  <Pencil  strokeWidth={1.5}/>
                </ToggleGroupItem>

                {/* <ToggleGroupItem onClick={()=>settool("Text")} value="Text" aria-label="Toggle strikethrough">
                  <Type  strokeWidth={1.5}/>
                </ToggleGroupItem> */}
                {/* <ToggleGroupItem onClick={()=>settool("Image")} value="Image" aria-label="Toggle strikethrough">
                  <Image  strokeWidth={1.5}/>
                </ToggleGroupItem>  */}

                <ToggleGroupItem onClick={()=>settool("Eraser")} value="Eraser" aria-label="Toggle strikethrough">
                  <Eraser  strokeWidth={1.5}/>
                </ToggleGroupItem>

                {/* <div className="border-l h-5 mx-1 border-black/10"/> */}
               
                {/* <ToggleGroupItem onClick={()=>settool("Lock")} value="Lock" aria-label="Toggle strikethrough">
                  <Lock/>
                </ToggleGroupItem>
              
                <ToggleGroupItem onClick={()=>settool("Menu")} value="Menu" aria-label="Toggle strikethrough">
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
