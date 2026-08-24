
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bot, Brain, Sparkles, WandSparkles } from "lucide-react"


export function AiMenuDropdown(){
  
  return <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">
            <Sparkles></Sparkles>
            <div className="font-normal">
                AI
            </div>
        </Button>} />
      <DropdownMenuContent className="w-46" align="start" sideOffset={15}>
        <DropdownMenuGroup >
          <DropdownMenuLabel>Generate</DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <div className="flex flex-col gap-1">
            <DropdownMenuItem>
                <Brain className="mx-1"></Brain>
                Text to diagram
                {/* <Bot className="h-10"></Bot> */}
            </DropdownMenuItem>

            <DropdownMenuItem className={"gap-2"}>
                <WandSparkles  className="mx-1"></WandSparkles>
                Wireframe to code
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
}