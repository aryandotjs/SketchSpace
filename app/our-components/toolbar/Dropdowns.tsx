
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
import { Bot, Brain, ChevronsLeftRight, EllipsisVertical, Frame, Lasso, PaintBucket, Shapes, Sparkles, Wand, WandSparkles } from "lucide-react"


export function AiMenuDropdown(){
  
  return <DropdownMenu>
      <DropdownMenuTrigger
        className={"border-none"}
        render={<Button variant="outline">
            <Sparkles strokeWidth={1.5}></Sparkles>
            <div className="font-normal">
                AI
            </div>
        </Button>} />
      <DropdownMenuContent className="w-46" align="start" sideOffset={15}>
        <DropdownMenuGroup >
          <DropdownMenuLabel>Generate</DropdownMenuLabel>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <div className="flex flex-col gap-1 p-0.5">
              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <Brain strokeWidth={2}  className="mx-[4px]  !h-3.5 !w-3.5"></Brain>
                  <div className="text-[13.5px]">
                      Text to diagram
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <WandSparkles   strokeWidth={2}  className="mx-[4px]  !h-3.5 !w-3.5"></WandSparkles>
                  <div className="text-[13.5px]">
                      Wireframe to code
                  </div>
              </DropdownMenuItem>
            </div>
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
}

export function MainMenuDropdown(){
  
  return <DropdownMenu>
        <DropdownMenuTrigger
          className={"border-none"}
          render={<Button variant="outline">
          <EllipsisVertical strokeWidth={1.5}></EllipsisVertical>
          </Button>} 
        />
      <DropdownMenuContent alignOffset={-160} className="w-50" align="start" sideOffset={15}>
        <DropdownMenuGroup >
            <div className="flex flex-col gap-1 p-0.5">

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                     <Frame strokeWidth={2}  className="!h-3.5 !w-3.5"></Frame>
                  </div>
                  <div className="text-[13.5px]">
                      Frame tool
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                     <ChevronsLeftRight   strokeWidth={2}  className=" !h-4.5 !w-4.5"></ChevronsLeftRight>
                  </div>
                  <div className="text-[13.5px]">
                      Web Embed
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                     <Shapes   strokeWidth={2}  className="mx-[3px]  !h-4 !w-4"></Shapes>
                  </div>
                  <div className="text-[13.5px]">
                      Draw to shape
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                     <Wand   strokeWidth={2}  className="mx-[3px]  !h-4 !w-4"></Wand>
                  </div>
                  <div className="text-[13.5px]">
                      Laser pointer
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                    <PaintBucket   strokeWidth={2}  className="mx-[4px]  !h-3.5 !w-3.5"></PaintBucket>
                  </div>
                
                  <div className="text-[13.5px]">
                      Bucket fill
                  </div>
              </DropdownMenuItem>

              <DropdownMenuItem className={"h-8 flex item-center"}>
                  <div className={" w-5.5 flex item-center justify-center"}>
                    <Lasso   strokeWidth={2}  className="mx-[3px]  !h-4 !w-4"></Lasso>
                  </div>
                  <div className="text-[13.5px]">
                      Lasso selection
                  </div>
              </DropdownMenuItem>

            </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  
}