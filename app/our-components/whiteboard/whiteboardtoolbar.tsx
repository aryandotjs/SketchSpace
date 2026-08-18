import { Circle, RectangleHorizontal, Eraser , Pen } from 'lucide-react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Dispatch, SetStateAction, useState } from 'react';
import { Tool } from '@/app/lib/whiteboard/tools';

export function ToggleToolbar({settool,tool}:{settool:Dispatch<SetStateAction<Tool>>,tool:string}) {
  return (
    <ToggleGroup variant="outline" >
      <ToggleGroupItem onClick={()=>settool("Pen")} value="Pen" aria-label="Toggle bold" >
        <Pen/>
      </ToggleGroupItem>
      <ToggleGroupItem onClick={()=>settool("Circle")} value="italic" aria-label="Toggle italic">
        <Circle/>
      </ToggleGroupItem>
      <ToggleGroupItem onClick={()=>settool("Rectangle")} value="strikethrough" aria-label="Toggle strikethrough">
        <RectangleHorizontal />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
