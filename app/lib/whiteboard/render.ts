import { drawArrow, drawdiamond, drawEllipse, drawLine, drawRectangle, drawStroke } from "./drawing";
import { Arrow, Ellipse, Line, Rectangle, Shape, Stroke } from "./tools/types";


export const renderAll = (
    ctx: CanvasRenderingContext2D,
    shapes: Shape[],
    rect: DOMRect
) => {
    ctx.clearRect(0, 0, rect.width, rect.height)


    shapes.forEach((sp) => {
        if (sp.type === "rectangle") {
            drawRectangle(ctx, sp)
        }
        if (sp.type === "Diamond") {
            drawdiamond(ctx, sp)
        }
        if (sp.type === "line") {
            drawLine(ctx, sp)
        }
        if (sp.type === "arrow") {
            drawArrow(ctx, sp)
        }
        if (sp.type === "ellipse") {
            drawEllipse(ctx, sp)
        }
        if (sp.type === "stroke") {
            drawStroke(ctx, sp)
        }
    })

}