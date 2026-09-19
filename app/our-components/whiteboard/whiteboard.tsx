"use client"; 
 
import React, { useEffect, useRef, useState } from "react"; 
import { ToggleToolbar } from "./whiteboardtoolbar";
import { Tool } from "@/app/lib/whiteboard/tools";
import { pencilPointerDown, pencilPointerMove, pencilPointerUp } from "@/app/lib/whiteboard/tools/pencil";
import { renderAll } from "@/app/lib/whiteboard/render";
import { rectanglePointerDown, rectanglePointerMove, rectanglePointerUp } from "@/app/lib/whiteboard/tools/rectangle";
import { ellipsePointerDown, ellipsePointerMove, ellipsePointerUp } from "@/app/lib/whiteboard/tools/ellipse";
import {  linePointerDown, linePointerMove, linePointerUp } from "@/app/lib/whiteboard/tools/line";
import { eraserHandler, eraserPointerUp } from "@/app/lib/whiteboard/tools/eraser";
import { diamondPointerDown, diamondPointerMove, diamondPointerUp } from "@/app/lib/whiteboard/tools/diamond";
import { arrowPointerDown, arrowPointerMove, arrowPointerUp } from "@/app/lib/whiteboard/tools/arrow";
import { ArrowElement, BorderType, DiamondElement, DimentionsMultipleSelectBox, Element, EllipseElement, fillStyleEnum, FreedrawElement, historyBlock, LineElement, MoveEleObjType, MoveMultipleEleObjType, MultipleResizeEleObjType, MultipleSelectObjType, Point, RectangleElement, resizeEleObjType, StrokeStyle } from "@/app/lib/whiteboard/tools/types";
import { onPointdowmText } from "@/app/lib/whiteboard/tools/text";
import { cursorPointerDown, cursorPointerMove, cursorPointerUp } from "@/app/interaction/cursor";
import { handleKeydown } from "@/app/actions/handleKeydown";
import { StyleCard } from "../stylecard/stylecard";
 
 
export function Whiteboard() { 
    const [tool,settool] = useState<Tool>("Cursor")

    const [Elements,setElements] = useState<Element[]>([])
    const [SelectedElement,setSelectedElement] = useState<Element|null>(null)

    const [MultipleSelectedElements,setMultipleSelectedElements] = useState<Element[]|null>(null)
    const [DimentionsMutipleSelectionBox, setDimentionsMutipleSelectionBox] = useState<DimentionsMultipleSelectBox|null>(null)
    
    const [strokeColor,setstrokeColor] = useState<string>("#fff")
    const [backgroundColor,setbackgroundColor] = useState<string>("#ffc9c900")
    const [fillType,setfillType] = useState<fillStyleEnum>(fillStyleEnum.Solid)
    const [strokewidth,setstrokewidth] = useState<string>("3.5")
    const [strokeStyle,setStrokeStyle] = useState<StrokeStyle>(StrokeStyle.Solid)
    const [border,setborder] = useState<BorderType>("rounded")
    const [opacity,setopacity] = useState<number>(100)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const previousPointRef = useRef<Point|null>(null)
    const curruntStroke = useRef<FreedrawElement|null>(null)
    const curruntRectangle = useRef<RectangleElement|null>(null)
    const curruntDiamond = useRef<DiamondElement|null>(null)
    const curruntEllipse = useRef<EllipseElement|null>(null)
    const curruntArrow = useRef<ArrowElement|null>(null)
    const curruntLine = useRef<LineElement|null>(null)

    const curruntResizeElementObj = useRef<resizeEleObjType|null>(null)
    const curruntMoveElementObj = useRef<MoveEleObjType|null>(null)
    const curruntMultipleSelectObj = useRef<MultipleSelectObjType|null>(null)
    const MoveMultipleSelectObj = useRef<MoveMultipleEleObjType|null>(null)
    const ResizeMultipleSelectObj = useRef<MultipleResizeEleObjType|null>(null)
    const clipboardRef = useRef<Element[] | null>(null)
    const currentPointRef = useRef<Point | null>(null)
    const undoref = useRef<historyBlock[]>([])
    const redoref = useRef<historyBlock[]>([])
    
    
    const ErasedElementIds = useRef<string[]|null>(null)
    
    const [editingText, setEditingText] = useState<{
        x: number;
        y: number;
    } | null>(null);
    
    const [textValue, setTextValue] = useState("");
    

    useEffect(() => {  
        
        const keydownhandler = (e:KeyboardEvent) => { 
            handleKeydown(
                e,
                Elements,
                setElements,
                SelectedElement,
                setSelectedElement,
                MultipleSelectedElements,
                DimentionsMutipleSelectionBox,
                setDimentionsMutipleSelectionBox,
                setMultipleSelectedElements,
                clipboardRef,
                currentPointRef,
                settool,
                undoref,
                redoref
            )
        }
        window.addEventListener("keydown",
            keydownhandler)
        
        const canvas = canvasRef.current; 
        if (!canvas) return; 
    
        const ctx = canvas.getContext("2d"); 
        if (!ctx) return; 
    
        const resize = () => { 

        const rect = canvas.getBoundingClientRect(); 
        const dpr = window.devicePixelRatio || 1.25; 
        
        canvas.width = rect.width * dpr; 
        canvas.height = rect.height * dpr; 
    
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
    
        renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
        }; 
    
        resize(); 
    
        window.addEventListener("resize", resize); 
    
        return () => { 
        window.removeEventListener("resize", resize); 
        window.removeEventListener("keydown",keydownhandler)
        }; 

    }, [Elements,SelectedElement,MultipleSelectedElements,DimentionsMutipleSelectionBox,tool]); 

    const getPoint = (event:React.PointerEvent)=>{
         const canvas = canvasRef.current!
         const rectangle = canvas.getBoundingClientRect()
         return {
            x : event.clientX - rectangle.left,
            y : event.clientY - rectangle.top
         }
    }

    const handlePointerDown = (event : React.PointerEvent) => {
        const point = getPoint(event)
        
         if (tool === "Cursor") {
            cursorPointerDown(
                event,
                point,
                Elements,
                setElements,
                SelectedElement,
                setSelectedElement,
                curruntResizeElementObj,
                curruntMoveElementObj,
                curruntMultipleSelectObj,
                MultipleSelectedElements,
                setMultipleSelectedElements,
                DimentionsMutipleSelectionBox,
                setDimentionsMutipleSelectionBox,
                MoveMultipleSelectObj,
                ResizeMultipleSelectObj,
                    undoref
            )
         }

        if (tool === "Line") {curruntLine.current = linePointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor) }
        if (tool === "Arrow") {curruntArrow.current = arrowPointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor) }
        if (tool === "Freedraw") {curruntStroke.current = pencilPointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor)}
        if (tool === "Rectangle") {curruntRectangle.current = rectanglePointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor,border)} 
        if (tool === "Diamond") {curruntDiamond.current = diamondPointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor)} 
        if (tool === "Ellipse") { curruntEllipse.current = ellipsePointerDown(point,strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor) }
        if (tool === "Eraser") { 
            ErasedElementIds.current = []
            previousPointRef.current = point
         }
        if (tool === "Text") { 
            const point = getPoint(event);

            if (textValue.length > 0) {
               const textElement =  onPointdowmText({x : editingText?.x ?? 0, y : editingText?.y ?? 0},strokeColor,Number(strokewidth),strokeStyle,opacity,backgroundColor)
               textElement.text = textValue 
               setElements((prev)=>{
                 return [...prev ,textElement]
               })
            }

            setEditingText({
                x: point.x,
                y: point.y,
            });
            setTextValue("");

        }
        
        canvasRef.current?.setPointerCapture(event.pointerId)

    }

    const handlePointerMove = (event : React.PointerEvent) => {

        const point = getPoint(event)
        currentPointRef.current = point
        const canvas = canvasRef.current
        if (!canvas) return;
        const ctx = canvas?.getContext("2d")
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
         
        if (tool === "Cursor") {
            cursorPointerMove(
                curruntResizeElementObj,
                curruntMoveElementObj,
                curruntMultipleSelectObj,
                point,
                Elements,
                setElements,
                canvas,
                SelectedElement,
                setSelectedElement,
                MultipleSelectedElements,
                setMultipleSelectedElements,
                DimentionsMutipleSelectionBox,
                setDimentionsMutipleSelectionBox,
                MoveMultipleSelectObj,
                ResizeMultipleSelectObj,
                undoref

            )
        }

        if (curruntLine.current && tool === "Line") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            linePointerMove(curruntLine,ctx,point)
        }
        if (curruntArrow.current && tool === "Arrow") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            arrowPointerMove(curruntArrow,ctx,point)
        }
        if (curruntStroke.current && tool === "Freedraw") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            pencilPointerMove(curruntStroke,ctx,point)
        }
        
        if (curruntRectangle.current && tool === "Rectangle") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            rectanglePointerMove(curruntRectangle,ctx,point)            
        }
        if (curruntDiamond.current && tool === "Diamond") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            diamondPointerMove(curruntDiamond,ctx,point)            
        }
        if (curruntEllipse.current && tool === "Ellipse") {
            renderAll(ctx,Elements,rect,SelectedElement,curruntMoveElementObj,curruntResizeElementObj,null,MultipleSelectedElements,DimentionsMutipleSelectionBox,MoveMultipleSelectObj,ResizeMultipleSelectObj)
            ellipsePointerMove(curruntEllipse,ctx,point)            
        }
        if (ErasedElementIds.current && previousPointRef.current && tool === "Eraser") {
           eraserHandler(previousPointRef,ErasedElementIds,Elements,point,ctx,rect)
        }
        
    }

    const handlePointerUp = (event: React.PointerEvent)=>{
        if (!canvasRef.current) return;
        
        if(tool === "Cursor"){ cursorPointerUp(Elements,setElements ,
            curruntResizeElementObj,
            curruntMoveElementObj,
            curruntMultipleSelectObj,
            canvasRef.current,
            SelectedElement,
            setSelectedElement,
            setMultipleSelectedElements,
            setDimentionsMutipleSelectionBox,
            MultipleSelectedElements,
            DimentionsMutipleSelectionBox,
            MoveMultipleSelectObj,
            ResizeMultipleSelectObj,
            undoref,
            redoref
        )}

        if (tool === "Line") { linePointerUp(curruntLine,setElements,settool, setSelectedElement,Elements,undoref,redoref) }
        if (tool === "Arrow") { arrowPointerUp(curruntArrow,setElements,settool,setSelectedElement,Elements,undoref,redoref) }
        if (tool === "Freedraw") { pencilPointerUp(curruntStroke,setElements,Elements,undoref,redoref) }
        if (tool === "Rectangle") {rectanglePointerUp(curruntRectangle,Elements,setElements,settool,setSelectedElement,undoref,redoref)}
        if (tool === "Diamond") {diamondPointerUp(curruntDiamond,settool,setSelectedElement,setElements,Elements,undoref,redoref)}
        if (tool === "Ellipse") {ellipsePointerUp(curruntEllipse,setElements,settool,Elements,setSelectedElement,undoref,redoref)}
        if (tool === "Eraser") { eraserPointerUp(previousPointRef,ErasedElementIds,setElements,Elements,undoref)}
        
        canvasRef.current?.releasePointerCapture(event.pointerId)
    }
    
   
    return ( <div className="h-full w-full relative">
        <div className="fixed top-0 left-0 bg-gray-950 text-red-600 gap text-xs">
            <div> selected ele id : {SelectedElement?.id} </div> 
            <div> elements length : {Elements.length} </div>
            <div> multiple selected length :{MultipleSelectedElements?.length}</div>
            <div>{undoref.current ? undoref.current.length   :   "false"}</div>
        </div>
                {editingText && tool === "Text" && (
                    <textarea
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className={`border 40px`}
                    style={{
                        position: "absolute",
                        left: editingText.x,
                        top: editingText.y,

                        minHeight: "30px",

                        fontSize: "10px",
                        fontFamily: "Arial",

                        outline: "none",
                        resize: "none",
                        overflow: "hidden",

                        background: "transparent",
                    }}
                />
                )}
                <ToggleToolbar 
                 settool={settool}
                 tool={tool}
                 setSelectedElement={setSelectedElement} 
                 Elements={Elements} 
                 setElements={setElements} 
                 undoref={undoref}
                 setDimentionsMutipleSelectionBox={setDimentionsMutipleSelectionBox}
                 setMultipleSelectedElements={setMultipleSelectedElements}
                 ></ToggleToolbar>
                {/* <MainMenu></MainMenu> */}
                {/* <StyleCard
                    tool={tool}

                    setStrokecolor={setstrokeColor} 
                    strokeColor={strokeColor} 

                    setbackgroundcolor={setbackgroundColor}
                    backgroundcolor={backgroundColor}

                    fillType={fillType}
                    setfillType={setfillType}

                    setstrokeStyle={setStrokeStyle}
                    strokeStyle={strokeStyle}

                    strokeWidth={strokewidth}
                    setstrokeWidth={setstrokewidth}
                    
                    opacity={opacity}
                    setopacity={setopacity}

                    border={border}
                    setborder={setborder}


                    Elements={Elements} 
                    setElements={setElements} 
                    SelectedElement={SelectedElement}
                    setSelectedElement={setSelectedElement}
                    undoref={undoref}
                    redoref={redoref}
                    MultipleSelectedElements={MultipleSelectedElements}
                    DimentionsMutipleSelectionBox={DimentionsMutipleSelectionBox}
                    setMultipleSelectedElements={setMultipleSelectedElements}
                    setDimentionsMutipleSelectionBox={setDimentionsMutipleSelectionBox}
                    >
                </StyleCard> */}
                {/* <LibraryDrawer></LibraryDrawer> */}
                <canvas 
                    ref={canvasRef}
                    className={`h-full w-full touch-none bg-gray-950`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    >
                </canvas> 
            </div>
    )
}

 