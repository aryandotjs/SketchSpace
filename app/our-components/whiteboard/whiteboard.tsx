"use client"; 
 
import { Arrow, Diamond, Ellipse, Line, Point, Rectangle, Shape, Stroke, stylestroke } from "@/app/lib/whiteboard/tools/types"; 
import React, { useEffect, useRef, useState } from "react"; 
import { ToggleToolbar } from "./whiteboardtoolbar";
import { Tool } from "@/app/lib/whiteboard/tools";
import { pencilPointerDown, pencilPointerMove, pencilPointerUp } from "@/app/lib/whiteboard/tools/pencil";
import { renderAll } from "@/app/lib/whiteboard/render";
import { rectanglePointerDown, rectanglePointerMove, rectanglePointerUp } from "@/app/lib/whiteboard/tools/rectangle";
import { ellipsePointerDown, ellipsePointerMove, ellipsePointerUp } from "@/app/lib/whiteboard/tools/ellipse";
import { ispointOnLine, linePointerDown, linePointerMove, linePointerUp } from "@/app/lib/whiteboard/tools/line";
import { StyleCard } from "../stylecard/stylecard";
import { eraserHandler, eraserPointerUp } from "@/app/lib/whiteboard/tools/eraser";
import { diamondPointerDown, diamondPointerMove, diamondPointerUp } from "@/app/lib/whiteboard/tools/diamond";
import { arrowPointerDown, arrowPointerMove, arrowPointerUp } from "@/app/lib/whiteboard/tools/arrow";
 
 
export function Whiteboard() { 
    const [tool,settool] = useState<Tool>("none")


    const [shapes,setshapes] = useState<Shape[]>([])
    
    
    const [color,setcolor] = useState("#000000")
    const [bg,setbg] = useState("#ffc9c9")
    const [width,setwidth] = useState("1.5")
    const [styleofline,setstyleofline] = useState<stylestroke>(stylestroke.Normal)
    const [opacity,setopacity] = useState<number>(100)

    
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const previousPointRef = useRef<Point|null>(null)
    const curruntStroke = useRef<Stroke|null>(null)
    const curruntRectangle = useRef<Rectangle|null>(null)
    const curruntDiamond = useRef<Diamond|null>(null)
    const curruntEllipse = useRef<Ellipse|null>(null)
    const curruntArrow = useRef<Arrow|null>(null)
    const curruntLine = useRef<Line|null>(null)

    const allEraseshapes = useRef<string[]|null>(null)
   
    useEffect(() => { 
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
    
        renderAll(ctx,shapes,rect)
        }; 
    
        resize(); 
    
        window.addEventListener("resize", resize); 
    
        return () => { 
        window.removeEventListener("resize", resize); 
        }; 

    }, [shapes]); 

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
        
        if (tool === "Line") {curruntLine.current = linePointerDown(point,color,Number(width),styleofline,opacity) }
        if (tool === "Arrow") {curruntArrow.current = arrowPointerDown(point,color,Number(width),styleofline,opacity) }
        if (tool === "Pencil") {curruntStroke.current = pencilPointerDown(point,color,Number(width),styleofline,opacity)}
        if (tool === "Ellipse") { curruntEllipse.current = ellipsePointerDown(point,color,Number(width),styleofline,opacity) }
        if (tool === "Rectangle") {curruntRectangle.current = rectanglePointerDown(point,color,Number(width),styleofline,opacity)} 
        if (tool === "Diamond") {curruntDiamond.current = diamondPointerDown(point,color,Number(width),styleofline,opacity)} 

        if (tool === "Eraser") { allEraseshapes.current = []
            previousPointRef.current = point }

        canvasRef.current?.setPointerCapture(event.pointerId)

    }

    const handlePointerMove = (event : React.PointerEvent) => {
        const point = getPoint(event)
        const canvas = canvasRef.current
        if (!canvas) return;
        const ctx = canvas?.getContext("2d")
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
         
        
        if (allEraseshapes.current && previousPointRef.current && tool === "Eraser") {
           eraserHandler(previousPointRef,allEraseshapes,shapes,point,ctx,rect)
        }

        if (curruntArrow.current && tool === "Arrow") {
            renderAll(ctx,shapes,rect)
            arrowPointerMove(curruntArrow,ctx,point)
        }
        if (curruntLine.current && tool === "Line") {
            renderAll(ctx,shapes,rect)
            linePointerMove(curruntLine,ctx,point)
        }
        if (tool === "Rectangle") {
            renderAll(ctx,shapes,rect)
            rectanglePointerMove(curruntRectangle,ctx,point)            
        }
        if (tool === "Diamond") {
            renderAll(ctx,shapes,rect)
            diamondPointerMove(curruntDiamond,ctx,point)            
        }

        if (tool === "Ellipse") {
            renderAll(ctx,shapes,rect)
            ellipsePointerMove(curruntEllipse,ctx,point)            
        }
        if (tool === "Pencil") {
            renderAll(ctx,shapes,rect)
            pencilPointerMove(curruntStroke,ctx,point)
        }
        
    }

    const handlePointerUp = (event: React.PointerEvent)=>{
      
        if (tool === "Eraser") { eraserPointerUp(previousPointRef,allEraseshapes,setshapes,shapes)}
        if (tool === "Pencil") { pencilPointerUp(curruntStroke,setshapes) }
        if (tool === "Line") { linePointerUp(curruntLine,setshapes) }
        if (tool === "Arrow") { arrowPointerUp(curruntArrow,setshapes) }
        if (tool === "Rectangle") {rectanglePointerUp(curruntRectangle,setshapes)}
        if (tool === "Diamond") {diamondPointerUp(curruntDiamond,setshapes)}
        if (tool === "Ellipse") {ellipsePointerUp(curruntEllipse,setshapes)}
        
        
   
        canvasRef.current?.releasePointerCapture(event.pointerId)
    }

    return ( <div className="h-full w-full">
                <ToggleToolbar settool={settool} tool={tool}></ToggleToolbar>
                <StyleCard 
                    tool={tool}
                    setcolor={setcolor} 
                    color={color} 
                    setbg={setbg}
                    bg={bg}
                    setstyleofline={setstyleofline}
                    styleofline={styleofline}
                    width={width}
                    setwidth={setwidth}
                    opacity={opacity}
                    setopacity={setopacity}>
                </StyleCard>
                <canvas 
                    ref={canvasRef}
                    className="h-full w-full touch-none cursor-crosshair"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    >
                </canvas> 
            </div>
    )
}

 