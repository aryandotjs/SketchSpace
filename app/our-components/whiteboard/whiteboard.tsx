"use client"; 
 
import { drawRectangle, drawStroke } from "@/app/lib/whiteboard/drawing"; 
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
    const [Ellipse,setEllipse] = useState<Ellipse[]>([])
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
            curruntRectangle.current = {
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
   
        canvasRef.current?.releasePointerCapture(event.pointerId)

    }

    return ( <div className="h-full w-full">
                <div className="absolute top-4 w-full flex justify-center">
                    <div className="border p-2 w-min border-black/20  rounded-md">
                        <ToggleToolbar settool={settool} tool={tool}></ToggleToolbar>
                    </div>
                </div>
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


//     const [strokes, setStrokes] = useState<Stroke[]>([]); 
    
//     const canvasRef = useRef<HTMLCanvasElement>(null); 
//     const currentStroke = useRef<Stroke | null>(null); 
 
//   useEffect(() => { 
//     const canvas = canvasRef.current; 
//     if (!canvas) return; 
 
//     const ctx = canvas.getContext("2d"); 
//     if (!ctx) return; 
 
//     const resize = () => { 
//       const rect = canvas.getBoundingClientRect(); 
//       const dpr = window.devicePixelRatio || 1; 
 
//       canvas.width = rect.width * dpr; 
//       canvas.height = rect.height * dpr; 
 
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
 
//       ctx.clearRect(0, 0, rect.width, rect.height); 
 
//       strokes.forEach((stroke) => { 
//         drawStroke(ctx, stroke); 
//       }); 
//     }; 
 
//         resize(); 
    
//         window.addEventListener("resize", resize); 
    
//         return () => { 
//         window.removeEventListener("resize", resize); 
//         }; 
//     }, [strokes]); 

//     const getPoint = (event: React.PointerEvent): Point => { 
//         const canvas = canvasRef.current!; 
//         const rect = canvas.getBoundingClientRect(); 
    
//         return { 
//         x: event.clientX - rect.left, 
//         y: event.clientY - rect.top, 
//         }; 
//     }; 
    
//     const handlePointerDown = (event: React.PointerEvent) => { 
//         const point = getPoint(event); 
    
//         currentStroke.current = { 
//         points: [point], 
//         color: DEFAULT_COLOR, 
//         width: DEFAULT_WIDTH, 
//         }; 
    
//         canvasRef.current?.setPointerCapture(event.pointerId); 
//     }; 

//     const handlePointerMove = (event: React.PointerEvent) => { 
//         const stroke = currentStroke.current; 
    
//         if (!stroke) return; 
    
//         const point = getPoint(event); 
    
//         stroke.points.push(point); 
    
//         const canvas = canvasRef.current; 
//         const ctx = canvas?.getContext("2d"); 
    
//         if (!ctx) return; 
    
//         drawStroke(ctx, stroke); 
//     }; 
    

//     const handlePointerUp = (event: React.PointerEvent) => { 
//         const stroke = currentStroke.current; 
    
//         if (!stroke) return; 
    
//         setStrokes((previous) => [...previous, stroke]); 

    
//         currentStroke.current = null; 
//         canvasRef.current?.releasePointerCapture(event.pointerId); 
//     }; 
    
//     return ( 
//         <canvas 
//         ref={canvasRef}
//         className="touch-none border-4 border-black" 
//         onPointerDown={handlePointerDown} 
//         onPointerMove={handlePointerMove} 
//         onPointerUp={handlePointerUp} 
//         onPointerCancel={handlePointerUp} 
//         /> 
//     ); 
// } 