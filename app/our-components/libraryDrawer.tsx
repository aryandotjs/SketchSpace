import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Library, Plus, Search } from "lucide-react"

export function LibraryDrawer() {
  return (
    <Sheet >
      <SheetTrigger >
        <button className="bg-red-400 absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700">
          <Library size={14} />
          <span>Library</span>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-4 flex flex-col gap-4">
        <SheetHeader className="flex flex-row items-center justify-between pb-2 border-b">
          <SheetTitle className="text-base font-semibold">Library</SheetTitle>
          <button className="p-1 rounded bg-[#6965db] text-white hover:bg-[#5854c7]">
            <Plus size={14} />
          </button>
        </SheetHeader>

        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search library..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6965db]"
          />
        </div>

        {/* Library Items Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pt-2">
          <div className="h-24 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center bg-zinc-50 hover:border-[#6965db] cursor-pointer">
            <span className="text-xs text-zinc-400">Item 1</span>
          </div>
          <div className="h-24 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center bg-zinc-50 hover:border-[#6965db] cursor-pointer">
            <span className="text-xs text-zinc-400">Item 2</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}