import { ArrowElement, DiamondElement, Element, EllipseElement, FreedrawElement, LineElement, RectangleElement, StrokeStyle, TextElement } from "./tools/types";


export function drawLine(ctx: CanvasRenderingContext2D, line: LineElement) {
    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity } = line

    if (!height && !width) return
    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(x, y)
    ctx.lineTo(x - width, y - height)

    ctx.stroke()
}

export function drawArrow(ctx: CanvasRenderingContext2D, arrow: ArrowElement) {

    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity } = arrow

    if (!height && !width) return
    const dx = width
    const dy = height

    const mainlineradian = Math.atan2(dx, dy)

    const newlineradian = mainlineradian + Math.PI / 9
    const newlineradian2 = mainlineradian - Math.PI / 9

    const ax = (x - width) + 25 * Math.sin(newlineradian)
    const ay = (y - height) + 25 * Math.cos(newlineradian)

    const bx = (x - width) + 25 * Math.sin(newlineradian2)
    const by = (y - height) + 25 * Math.cos(newlineradian2)



    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(x, y)
    ctx.lineTo(x - width, y - height)

    ctx.moveTo(x - width, y - height)
    ctx.lineTo(ax, ay)

    ctx.moveTo(x - width, y - height)
    ctx.lineTo(bx, by)

    ctx.stroke()
}

export function drawFreedraw(ctx: CanvasRenderingContext2D, Freedraw: FreedrawElement) {

    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity, points } = Freedraw
    if (points.length === 0) return

    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()

}


export function drawRectangle(ctx: CanvasRenderingContext2D, rectangle: RectangleElement) {

    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity } = rectangle

    if (!height && !width) return
    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(x, y)
    ctx.lineTo(x - width, y)
    ctx.lineTo(x - width, y - height)
    ctx.lineTo(x, y - height)
    ctx.closePath()

    ctx.stroke()
}
export function drawdiamond(ctx: CanvasRenderingContext2D, diamond: DiamondElement) {

    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity } = diamond

    if (!height && !width) return
    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.moveTo(x - (width / 2), y)
    ctx.lineTo(x - width, y - (height / 2))
    ctx.lineTo(x - (width / 2), y - height)
    ctx.lineTo(x, y - height / 2)

    ctx.closePath()

    ctx.stroke()
}

export function drawEllipse(ctx: CanvasRenderingContext2D, ellipse: EllipseElement) {

    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity } = ellipse

    if (!height && !width) return
    ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);
    ctx.beginPath()
    ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    const h = Math.abs(height)
    const w = Math.abs(width)

    const centerX = (x + x - width) / 2
    const centerY = (y + y - height) / 2

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


export function drawText(ctx: CanvasRenderingContext2D, textElement: TextElement) {
    let { x, y, height, width, strokeColor, strokeStyle, strokeWidth, opacity, text, fontFamily, fontSize, textAlign, verticalAlign } = textElement

    // if (!height && !width) return

    // ctx.setLineDash(strokeStyle === StrokeStyle.Dotted ? [2, 9] : strokeStyle === StrokeStyle.Dashed ? [8, 10] : [0, 0]);

    // ctx.globalAlpha = Number((opacity * 0.01).toFixed(1))
    // ctx.beginPath()
    // ctx.strokeStyle = strokeColor
    // ctx.lineWidth = strokeWidth
    // ctx.lineJoin = "round"
    // ctx.lineCap = "round"

    // ctx.moveTo(x, y)
    // ctx.lineTo(x - width, y - height)

    // ctx.stroke()
    ctx.fillText(text, x, y)
}

export function drawSelectionFrame(
    ctx: CanvasRenderingContext2D,
    element: Element
) {
    const offby = 4
    const squareSize = 8

    const { x, y, width, height } = element

    if (width === 0 && height === 0) return

    const left = Math.min(x, x - width)
    const right = Math.max(x, x - width)

    const top = Math.min(y, y - height)
    const bottom = Math.max(y, y - height)

    const boxWidth = right - left
    const boxHeight = bottom - top

    ctx.beginPath()
    ctx.strokeStyle = "#9290E8"
    ctx.lineWidth = 1
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.rect(
        left - offby,
        top - offby,
        boxWidth + offby * 2,
        boxHeight + offby * 2
    )

    ctx.stroke()

    ctx.fillStyle = "#030712"
    ctx.strokeStyle = "#9290E8"
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 1.5
    // #030712

    ctx.fillRect(
        (left - offby) - squareSize / 2,
        (top - offby) - squareSize / 2,
        squareSize,
        squareSize
    )
    ctx.strokeRect(
        (left - offby) - squareSize / 2,
        (top - offby) - squareSize / 2,
        squareSize,
        squareSize
    )

    ctx.fillRect(
        (right + offby) - squareSize / 2,
        (top - offby) - squareSize / 2,
        squareSize,
        squareSize
    )
    ctx.strokeRect(
        (right + offby) - squareSize / 2,
        (top - offby) - squareSize / 2,
        squareSize,
        squareSize
    )

    ctx.fillRect(
        (right + offby) - squareSize / 2,
        (bottom + offby) - squareSize / 2,
        squareSize,
        squareSize
    )
    ctx.strokeRect(
        (right + offby) - squareSize / 2,
        (bottom + offby) - squareSize / 2,
        squareSize,
        squareSize
    )

    ctx.fillRect(
        (left - offby) - squareSize / 2,
        (bottom + offby) - squareSize / 2,
        squareSize,
        squareSize
    )
    ctx.strokeRect(
        (left - offby) - squareSize / 2,
        (bottom + offby) - squareSize / 2,
        squareSize,
        squareSize
    )

    const rotationX = left + boxWidth / 2;
    const rotationY = top - 20;
    const radius = 4;
    ctx.beginPath();
    ctx.arc(
        rotationX,
        rotationY,
        radius,
        0,
        Math.PI * 2
    );
    ctx.strokeStyle = "#BEBCEF";

    ctx.lineWidth = 1.5;
    ctx.stroke();
}



export const drawSelectionForLine = (
    ctx: CanvasRenderingContext2D,
    element: Element
) => {
    const rotationX = element.x;
    const rotationY = element.y;
    const radius = 4;



    ctx.beginPath();
    ctx.arc(
        rotationX,
        rotationY,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "#030712";
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#BEBCEF";
    ctx.lineWidth = 1.5;
    ctx.arc(
        rotationX,
        rotationY,
        radius,
        0,
        Math.PI * 2
    );
    ctx.stroke();



    ctx.beginPath();
    ctx.arc(
        rotationX - element.width,
        rotationY - element.height,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "#030712";
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#BEBCEF";
    ctx.lineWidth = 1.5;
    ctx.arc(
        rotationX - element.width,
        rotationY - element.height,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();
} 