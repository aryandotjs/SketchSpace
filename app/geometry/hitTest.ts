import { ispointonEllipse } from "../lib/whiteboard/tools/ellipse"
import { Element, Point } from "../lib/whiteboard/tools/types"
const offby = 2
export const hitTest = (point: Point, Elements: Element[]): Element | null => {

    for (let e = 0; e < Elements.length; e++) {

        if (ispointOnElement(point, Elements[e])) {
            return Elements[e]
        }
    }

    return null
}

const ispointOnElement = (point: Point, Element: Element): boolean => {

    switch (Element.type) {
        case "ellipse":
            return ispointonEllipse(Element, point);

        case "rectangle":
            return (
                isPointNearLine(Element.x, Element.y, 0, Element.width, point) ||
                isPointNearLine(Element.x - Element.width, Element.y, Element.height, 0, point) ||
                isPointNearLine(Element.x - Element.width, Element.y - Element.height, 0, -Element.width, point) ||
                isPointNearLine(Element.x, Element.y - Element.height, -Element.height, 0, point)
            )

        case "diamond": {
            const top = { x: Element.x - (Element.width / 2), y: Element.y }
            const right = { x: Element.x - Element.width, y: Element.y - (Element.height / 2) }
            const left = { x: Element.x, y: Element.y - (Element.height / 2) }
            const bottom = { x: Element.x - (Element.width / 2), y: Element.y - Element.height }

            return (
                isPointNearLine(top.x, top.y, -(right.y - top.y), -(right.x - top.x), point) ||
                isPointNearLine(right.x, right.y, (right.y - bottom.y), (right.x - bottom.x), point) ||
                isPointNearLine(bottom.x, bottom.y, -(left.y - bottom.y), (right.x - bottom.x), point) ||
                isPointNearLine(left.x, left.y, -(top.y - left.y), -(top.x - left.x), point)
            )

        }
        case "line": {
            return isPointNearLine(Element.x, Element.y, Element.height, Element.width, point)
        }

        case "arrow": {
            return isPointNearLine(Element.x, Element.y, Element.height, Element.width, point)
        }
        case "freedraw": {
            const Allpoints = Element.points
            if (Allpoints.length < 1) return false

            let result = false;
            for (let i = 0; i < Allpoints.length - 1; i++) {
                if (isPointNearLine(Allpoints[i].x, Allpoints[i].y, Allpoints[i].y - Allpoints[i + 1].y, Allpoints[i].x - Allpoints[i + 1].x, point)) {
                    result = true;
                }
            }
            return result
        }

        case "text": {
            return (
                point.x >= Element.x &&
                point.x <= Element.x - Element.width &&
                point.y >= Element.y &&
                point.y <= Element.y - Element.height
            )
        }

        default: return false;
    }

}

export const isPointNearLine = (x: number, y: number, height: number, width: number, point: Point) => {
    const x1 = x;
    const y1 = y;

    const x2 = x - width;
    const y2 = y - height;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const lengthSquared = dx * dx + dy * dy;

    if (lengthSquared === 0) return false;

    const t =
        ((point.x - x1) * dx + (point.y - y1) * dy) /
        lengthSquared;
    const clampedT = Math.max(0, Math.min(1, t));


    const closestX = x1 + clampedT * dx;
    const closestY = y1 + clampedT * dy;

    const distance = Math.hypot(
        point.x - closestX,
        point.y - closestY
    );

    return distance <= 8;
}

export const isPointOnTopLeftSquare = (x: number, y: number, height: number, width: number, point: Point) => {
    if (
        x + offby > point.x &&
        y + offby > point.y &&
        x - width < point.x &&
        y - height < point.y
    ) {
        return true
    }
    return false
}
export const isPointOnTopRightSquare = (x: number, y: number, height: number, width: number, point: Point) => {
    if (
        x - offby < point.x &&
        y + offby > point.y &&
        y - height < point.y &&
        x + width > point.x
    ) {
        return true
    }
    return false
}
export const isPointOnBottomRightSquare = (x: number, y: number, height: number, width: number, point: Point) => {
    if (
        x - offby < point.x &&
        y - offby < point.y &&
        x + width > point.x &&
        y + height > point.y
    ) {
        return true
    }
    return false
}
export const isPointOnBottomLeftSquare = (x: number, y: number, height: number, width: number, point: Point) => {
    if (
        x + offby > point.x &&
        y - offby < point.y
        &&
        y + height > point.y
        &&
        x - width < point.x
    ) {
        return true
    }
    return false
}
export const isPointOnSmallCircle = (x: number, y: number, height: number, width: number, point: Point) => {
    const centerX = x
    const centerY = y

    const radiusX = Math.abs(width) / 2
    const radiusY = Math.abs(height) / 2

    const dx = point.x - centerX
    const dy = point.y - centerY

    const final = (dx * dx) / (radiusX * radiusX) +
        (dy * dy) / (radiusY * radiusY)

    return final < 4
}
