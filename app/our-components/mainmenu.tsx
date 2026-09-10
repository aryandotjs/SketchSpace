

import { 
 
  HelpCircle, 
  Settings, 
  ChevronRight, 
  Sun, 
  Moon, 
  Monitor, 
  LogIn, 
  Check
} from "lucide-react"
import { FaGithub, FaDiscord } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu, Folder, Save, Image, Users, Terminal, Search, TextAlignJustify, Download, ImagePlus, User, Flashlight, Zap, CircleQuestionMark, Trash2 } from "lucide-react"
import { useState } from "react"

export function MainMenu() {
  const [selectMode, setSelectMode] = useState<"wrap" | "overlap">("wrap")
  const [toolLock, setToolLock] = useState(false)
  const [snapToObjects, setSnapToObjects] = useState(false)
  const [toggleGrid, setToggleGrid] = useState(true)
  const [zenMode, setZenMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [canvasProperties, setCanvasProperties] = useState(true)
  const [arrowBinding, setArrowBinding] = useState(true)
  const [snapToMidpoints, setSnapToMidpoints] = useState(true)
  return (
    <DropdownMenu >
      <DropdownMenuTrigger
        render={<button className={" active:ring-1 active:ring-black/20 absolute top-4 left-4 rounded-md  p-[10px] bg-black/5 hover:bg-black/3 active:ring a"} >
            <TextAlignJustify size={15} strokeWidth={1.5} ></TextAlignJustify>
            </button>} 
        >
      </DropdownMenuTrigger>
      
      <DropdownMenuContent sideOffset={6} align="start" className="scrollbar-thin w-[260px] p-1.5 rounded-xl border border-black/5 shadow-lg bg-white text-[#1b1b1f]">
        
        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <Folder size={16} className="text-zinc-600" />
            <span>Open</span>
          </div>
          <DropdownMenuShortcut className="text-xs text-zinc-400">Ctrl+O</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <Download size={16} className="text-zinc-600" />
            <span>Save to...</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <Image size={16} className="text-zinc-600" />
            <span>Export image...</span>
          </div>
          <DropdownMenuShortcut className="text-xs text-zinc-400">Ctrl+Shift+E</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <Users size={16} className="text-zinc-600" />
            <span>Live collaboration...</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px] text-[#6965db] focus:text-[#6965db] focus:bg-[#6965db]/10 font-medium">
          <div className="flex items-center gap-3">
            <Zap size={16} />
            <span>Command palette</span>
          </div>
          <DropdownMenuShortcut className="text-xs text-[#6965db]/70">Ctrl+/</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <Search size={16} className="text-zinc-600" />
            <span>Find on canvas</span>
          </div>
          <DropdownMenuShortcut className="text-xs text-zinc-400">Ctrl+F</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px]">
          <div className="flex items-center gap-3">
            <HelpCircle size={16} className="text-zinc-600" />
            <span>Help</span>
          </div>
          <DropdownMenuShortcut className="text-xs text-zinc-400">?</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 text-[14px] text-zinc-700 focus:text-red-600">
          <div className="flex items-center gap-3">
            <Trash2 size={16} />
            <span>Reset the canvas</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-black/5" />

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px] font-semibold text-zinc-800">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-800 fill-current" strokeWidth={1.5}><path d="M2 13h6v6H2v-6zm14 0h6v6h-6v-6zM9 4h6v6H9V4z"/></svg>
          <span>Excalidraw+</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px] text-zinc-600">
          <FaGithub size={16} />
          <span>GitHub</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px] text-zinc-600">
          <FaXTwitter size={15} />
          <span>Follow us</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 text-[14px] text-zinc-600">
          <FaDiscord size={16} />
          <span>Discord chat</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#6965db]/10 text-[14px] text-[#6965db] focus:text-[#6965db] focus:bg-[#6965db]/10 font-medium">
          <LogIn size={16} />
          <span>Sign in</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-black/5" />

        {/* Preferences Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-[14px] text-zinc-700 hover:bg-black/5 data-[state=open]:bg-black/5">
            <div className="flex items-center gap-3">
              <Settings size={16} className="text-zinc-500" />
              <span>Preferences</span>
            </div>
            <ChevronRight size={14} className="text-zinc-400 ml-auto" />
          </DropdownMenuSubTrigger>
          
          <DropdownMenuSubContent className="p-1.5 rounded-xl border border-black/5 shadow-xl bg-white min-w-[240px] text-[#1b1b1f]">
            {/* Select on Toggle */}
            <div className="flex items-center justify-between px-2.5 py-1.5 text-[13px]">
              <span className="text-zinc-700">Select on</span>
              <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 text-xs">
                <button 
                  onClick={() => setSelectMode("wrap")}
                  className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${selectMode === "wrap" ? "bg-[#6965db] text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"}`}
                >
                  Wrap
                </button>
                <button 
                  onClick={() => setSelectMode("overlap")}
                  className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${selectMode === "overlap" ? "bg-[#6965db] text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"}`}
                >
                  Overlap
                </button>
              </div>
            </div>

            {/* Tool lock */}
            <DropdownMenuItem 
              onClick={() => setToolLock(!toolLock)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{toolLock && <Check size={14} className="text-zinc-700" />}</div>
                <span>Tool lock</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Q</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Snap to objects */}
            <DropdownMenuItem 
              onClick={() => setSnapToObjects(!snapToObjects)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{snapToObjects && <Check size={14} className="text-zinc-700" />}</div>
                <span>Snap to objects</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Alt+S</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Toggle grid */}
            <DropdownMenuItem 
              onClick={() => setToggleGrid(!toggleGrid)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{toggleGrid && <Check size={14} className="text-zinc-700" />}</div>
                <span>Toggle grid</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Ctrl+'</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Zen mode */}
            <DropdownMenuItem 
              onClick={() => setZenMode(!zenMode)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{zenMode && <Check size={14} className="text-zinc-700" />}</div>
                <span>Zen mode</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Alt+Z</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* View mode */}
            <DropdownMenuItem 
              onClick={() => setViewMode(!viewMode)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{viewMode && <Check size={14} className="text-zinc-700" />}</div>
                <span>View mode</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Alt+R</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Canvas & Shape properties */}
            <DropdownMenuItem 
              onClick={() => setCanvasProperties(!canvasProperties)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{canvasProperties && <Check size={14} className="text-zinc-700" />}</div>
                <span>Canvas & Shape properties</span>
              </div>
              <DropdownMenuShortcut className="text-xs text-zinc-400">Alt+/</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Arrow binding */}
            <DropdownMenuItem 
              onClick={() => setArrowBinding(!arrowBinding)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{arrowBinding && <Check size={14} className="text-zinc-700" />}</div>
                <span>Arrow binding</span>
              </div>
            </DropdownMenuItem>

            {/* Snap to midpoints */}
            <DropdownMenuItem 
              onClick={() => setSnapToMidpoints(!snapToMidpoints)} 
              className="flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded-lg cursor-pointer hover:bg-black/5"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">{snapToMidpoints && <Check size={14} className="text-zinc-700" />}</div>
                <span>Snap to midpoints</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Theme Section */}
        <div className="flex items-center justify-between px-3 py-2 text-[14px] text-zinc-700">
          <span>Theme</span>
          <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
            <button className="p-1.5 rounded-md bg-[#6965db] text-white shadow-sm" title="Light mode">
              <Sun size={14} />
            </button>
            <button className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800" title="Dark mode">
              <Moon size={14} />
            </button>
            <button className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800" title="System mode">
              <Monitor size={14} />
            </button>
          </div>
        </div>

        {/* Language Select */}
        <div className="px-3 py-1.5">
          <select 
            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg py-1.5 px-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6965db] appearance-none cursor-pointer"
            defaultValue="en"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundPosition: 'right 8px center', backgroundSize: '14px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Canvas Background Colors */}
        <div className="px-3 py-1.5 space-y-1.5">
          <span className="text-[12px] font-medium text-zinc-500">Canvas background</span>
          <div className="flex gap-2">
            <button className="w-6 h-6 rounded-md border-2 border-[#6965db] bg-white ring-2 ring-white" title="White" />
            <button className="w-6 h-6 rounded-md border border-zinc-200 bg-[#f8f9fa]" title="Light Gray" />
            <button className="w-6 h-6 rounded-md border border-zinc-200 bg-[#e9ecef]" title="Gray" />
            <button className="w-6 h-6 rounded-md border border-zinc-200 bg-[#fff9db]" title="Light Yellow" />
            <button className="w-6 h-6 rounded-md border border-zinc-200 bg-[#e7f5ff]" title="Light Blue" />
          </div>
        </div>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}


