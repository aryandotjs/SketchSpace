"use client"; 
 
import { drawEllipse, drawRectangle, drawStroke } from "@/app/lib/whiteboard/drawing"; 
import { Ellipse, Point, Rectangle, Stroke } from "@/app/lib/whiteboard/types"; 
import React, { useEffect, useRef, useState } from "react"; 
import { ToggleToolbar } from "./whiteboardtoolbar";
import { Button } from "@/components/ui/button";
import { Tool } from "@/app/lib/whiteboard/tools";
 
const DEFAULT_COLOR = "#00000"; 
const DEFAULT_WIDTH = 2; 
 
export function Whiteboard() { 
    const [strokes,setStrokes] = useState<Stroke[]>([])
    const [Rectangles,setRectangles] = useState<Rectangle[]>([])
    const [Ellipses,setEllipses] = useState<Ellipse[]>([])
    const [tool,settool] = useState<Tool>("Pen")
    
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    const curruntStroke = useRef<Stroke|null>(null)
    const curruntRectangle = useRef<Rectangle|null>(null)
    const curruntEllipse = useRef<Ellipse|null>(null)
   
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
    
        // ctx.clearRect(0, 0, rect.width, rect.height); 
    
        strokes.forEach((stroke) => { 
            drawStroke(ctx, stroke); 
        }); 
        }; 
    
        resize(); 
    
        window.addEventListener("resize", resize); 
    
        return () => { 
        window.removeEventListener("resize", resize); 
        }; 

    }, [strokes]); 

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
        
        if (tool === "Pen") {
            curruntStroke.current = {
                points : [point],
                color  : DEFAULT_COLOR,
                width  : DEFAULT_WIDTH
            } 
        }
        if (tool === "Rectangle") {
            curruntRectangle.current = {
                start : point ,
                current : point,
                color  : DEFAULT_COLOR,
                width  : DEFAULT_WIDTH            
            } 
        }
        if (tool === "Ellipse") {
            curruntEllipse.current = {
                start : point ,
                current : point,
                color  : DEFAULT_COLOR,
                width  : DEFAULT_WIDTH            
            } 
        }
        canvasRef.current?.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event : React.PointerEvent) => {
        const point = getPoint(event)

        const canvas = canvasRef.current
        if (!canvas) return;

        const ctx = canvas?.getContext("2d")
          if (!ctx) return;

        const rect = canvas.getBoundingClientRect();



          
        if (tool === "Pen") {
            const Stroke = curruntStroke.current
            if (!Stroke) return ;
            Stroke.points.push(point)
            ctx.clearRect(0, 0, rect.width, rect.height);
            
            strokes.forEach((stroke) => {
            drawStroke(ctx, stroke);
            });

            drawStroke(ctx, Stroke);
        }
        if (tool === "Rectangle") {
            const Rectangle = curruntRectangle.current
            if (!Rectangle) return ;
            Rectangle.current = point 
            
            ctx.clearRect(0, 0, rect.width, rect.height);

            Rectangles.forEach((rect) => {
            drawRectangle(ctx, rect);
            });

            drawRectangle(ctx, Rectangle);
        }
        if (tool === "Ellipse") {
            const Ellipse = curruntEllipse.current
            if (!Ellipse) return ;
            Ellipse.current = point 
            
            ctx.clearRect(0, 0, rect.width, rect.height);

            Ellipses.forEach((eps) => {
            drawEllipse(ctx, eps);
            });

            drawEllipse(ctx, Ellipse);
        }

    }

    const handlePointerUp = (event: React.PointerEvent)=>{
        
        if (tool === "Pen") {
            const stroke = curruntStroke.current 
            if (!stroke) return 
            setStrokes((prev)=>([...prev,stroke]))
            curruntStroke.current = null
        }

        if (tool === "Rectangle") {
            const Rectangle = curruntRectangle.current 
            if (!Rectangle) return 
            setRectangles((prev)=>([...prev,Rectangle]))
            curruntRectangle.current = null
        }
        if (tool === "Ellipse") {
            const Ellipse = curruntEllipse.current 
            if (!Ellipse) return 
            setEllipses((prev)=>([...prev,Ellipse]))
            curruntEllipse.current = null
        }
   
        canvasRef.current?.releasePointerCapture(event.pointerId)

    }

    return ( <div className="h-full w-full">
                <ToggleToolbar settool={settool} tool={tool}></ToggleToolbar>
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

 