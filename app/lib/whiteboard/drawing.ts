import { Arrow, Diamond, stylestroke, type Ellipse, type Line, type Point, type Rectangle, type Stroke } from "./tools/types";

export function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {

    const { points, color, width, style, opacity } = stroke
    if (points.length === 0) return
    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()
    // const { points, color, width } = stroke
    // if (points.length === 0) return
    // ctx.beginPath()
    // ctx.strokeStyle = "#FF0000"
    // ctx.lineWidth = 6
    // ctx.lineJoin = "round"
    // ctx.lineCap = "round"
    // for (let i = 0; i < points.length; i++) {
    //     ctx.moveTo(points[i].x, points[i].y)
    //     // ctx.lineTo(points[i].x, points[i].y)
    //     ctx.lineTo(points[i].x, points[i].y)
    //     // ctx.lineTo(points[i].x, points[i].y)
    // }
    // ctx.stroke()
}
export function drawRectangle(ctx: CanvasRenderingContext2D, rectangle: Rectangle) {

    const { start, current, color, width, style, opacity } = rectangle

    if (start === current) return
    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
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
export function drawdiamond(ctx: CanvasRenderingContext2D, diamond: Diamond) {

    const { start, current, color, width, style, opacity } = diamond

    if (start === current) return
    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo((current.x + start.x) / 2, start.y)
    ctx.lineTo(current.x, (current.y + start.y) / 2)
    ctx.lineTo((current.x + start.x) / 2, current.y)
    ctx.lineTo(start.x, (current.y + start.y) / 2)
    ctx.closePath()

    ctx.stroke()
}
export function drawEllipse(ctx: CanvasRenderingContext2D, ellipse: Ellipse) {

    const { start, current, color, width, style, opacity } = ellipse
    if (start === current) return
    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    const h = Math.abs(start.y - current.y)
    const w = Math.abs(start.x - current.x)

    const centerX = (start.x + current.x) / 2
    const centerY = (start.y + current.y) / 2

    const radiusX = w / 2
    const radiusY = h / 2

    ctx.ellipse(
        centerX,
        centerY,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke()
}
export function drawLine(ctx: CanvasRenderingContext2D, line: Line) {
    let { start, current, color, width, style, opacity } = line
    if (start === current) return
    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(current.x, current.y)

    ctx.stroke()
}
export function drawArrow(ctx: CanvasRenderingContext2D, arrow: Arrow) {

    const { start, current, color, width, style, opacity } = arrow
    if (start === current) return

    const radian = Math.atan2(current.y - start.y, current.x - start.x)
    const angle = radian + Math.PI / 9
    const angle2 = radian - Math.PI / 9

    const arrowLength = 25

    const headX = current.x - arrowLength * Math.cos(angle)
    const headY = current.y - arrowLength * Math.sin(angle)

    const headX2 = current.x - arrowLength * Math.cos(angle2)
    const headY2 = current.y - arrowLength * Math.sin(angle2)

    ctx.setLineDash(style === stylestroke.ExtraDashed ? [2, 9] : style === stylestroke.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(current.x, current.y)

    ctx.moveTo(current.x, current.y)
    ctx.lineTo(headX, headY)

    ctx.moveTo(current.x, current.y)
    ctx.lineTo(headX2, headY2)

    ctx.stroke()
}
