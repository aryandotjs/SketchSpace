import { drawArrow, drawdiamond, drawEllipse, drawFreedraw, drawLine, drawRectangle, drawSelectionForLine, drawSelectionFrame, drawText } from "./drawing"
import { Element } from "./tools/types"


export const renderAll = (
    ctx: CanvasRenderingContext2D,
    Elements: Element[],
    rect: DOMRect,
    selectedElement: Element | null,
    ResizeElement: Element | null
) => {

    ctx.clearRect(0, 0, rect.width, rect.height)

    Elements.forEach((el) => {
        if (el.type === "line") {
            drawLine(ctx, el)
        }
        if (el.type === "arrow") {
            drawArrow(ctx, el)
        }
        if (el.type === "freedraw") {
            drawFreedraw(ctx, el)
        }
        if (el.type === "rectangle") {
            drawRectangle(ctx, el)
        }
        if (el.type === "diamond") {
            drawdiamond(ctx, el)
        }
        if (el.type === "ellipse") {
            drawEllipse(ctx, el)
        }
        if (el.type === "text") {
            drawText(ctx, el)
        }
    })

    if (selectedElement) {
        if (
            selectedElement.type === "rectangle" ||
            selectedElement.type === "diamond" ||
            selectedElement.type === "ellipse" ||
            selectedElement.type === "freedraw"
        ) {
            drawSelectionFrame(ctx, selectedElement)
        }
        if (selectedElement.type === "line" || selectedElement.type === "arrow") {
            drawSelectionForLine(ctx, selectedElement)
        }
    }

    if (ResizeElement) {
        if (ResizeElement.type === "line") {
            drawLine(ctx, ResizeElement)
        }
        if (ResizeElement.type === "arrow") {
            drawArrow(ctx, ResizeElement)
        }
        if (ResizeElement.type === "freedraw") {
            drawFreedraw(ctx, ResizeElement)
        }
        if (ResizeElement.type === "rectangle") {
            drawRectangle(ctx, ResizeElement)
        }
        if (ResizeElement.type === "diamond") {
            drawdiamond(ctx, ResizeElement)
        }
        if (ResizeElement.type === "ellipse") {
            drawEllipse(ctx, ResizeElement)
        }
        if (ResizeElement.type === "text") {
            drawText(ctx, ResizeElement)
        }
    }
}