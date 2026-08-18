import type { Point, Rectangle, Stroke } from "./types";

export function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {

    const { points, color, width } = stroke
    if (points.length === 0) return
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.stroke()
}
export function drawRectangle(ctx: CanvasRenderingContext2D, rectangle: Rectangle) {

    const { start, current, color, width } = rectangle

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(current.x, start.y)
    ctx.lineTo(current.x, current.y)
    ctx.lineTo(start.x, current.y)
    ctx.closePath()

    ctx.stroke()
}

export function drawCircle(ctx: CanvasRenderingContext2D, rectangle: Rectangle) {

    const { start, current, color, width } = rectangle

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(current.x, start.y)
    ctx.lineTo(current.x, current.y)
    ctx.lineTo(start.x, current.y)
    ctx.closePath()

    ctx.stroke()
}
