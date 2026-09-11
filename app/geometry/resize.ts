import React, { Dispatch, SetStateAction } from "react"
import { Element, FreedrawElement, MoveEleObjType, Point, resizeEleObjType } from "../lib/whiteboard/tools/types"
import { hitTest, isPointNearLine, isPointOnBottomLeftSquare, isPointOnBottomRightSquare, isPointOnSmallCircle, isPointOnTopLeftSquare, isPointOnTopRightSquare } from "./hitTest"
import { ispointInBoundedBox } from "../lib/whiteboard/tools/rectangle"

const offby = 5



export const resizeElement = (
    curruntResizeMoveElementObj: React.RefObject<resizeEleObjType | null>,
    point: Point
) => {
    if (curruntResizeMoveElementObj.current?.Element.type === "freedraw") {
        HandleFreedrawResize(curruntResizeMoveElementObj, point)
    }

    switch (curruntResizeMoveElementObj.current?.contactPoint) {
        case "TopSide":
            handleResizeSideTop(curruntResizeMoveElementObj.current, point)
            break;
        case "BottomSide":
            handleResizeSideBottom(curruntResizeMoveElementObj.current, point)
            break;
        case "LeftSide":
            handleResizeSideLeft(curruntResizeMoveElementObj.current, point)
            break;
        case "RightSide":
            handleResizeSideRight(curruntResizeMoveElementObj.current, point)
            break;
        case "TopLeftSquare":
            handleResizeSquareTopLeft(curruntResizeMoveElementObj.current, point)
            break;
        case "TopRightSquare":
            handleResizeSquareTopRight(curruntResizeMoveElementObj.current, point)
            break;
        case "BottomLeftSquare":
            handleResizeSquareBottomLeft(curruntResizeMoveElementObj.current, point)
            break;
        case "BottomRightSquare":
            handleResizeSquareBottomRight(curruntResizeMoveElementObj.current, point)
            break;
        case "LeftCircle":
            handleResizeLeftCircle(curruntResizeMoveElementObj.current, point)
            break;
        case "RightCircle":
            handleResizeRightCircle(curruntResizeMoveElementObj.current, point)
            break;
    }
}

export const handleResizeSideTop = (ElementObj: resizeEleObjType, point: Point) => {
    if (point.y >= ElementObj.bottom) {
        ElementObj.Element.y = ElementObj.bottom
        ElementObj.Element.height = ElementObj.bottom - point.y
        return
    }
    ElementObj.Element.y = point.y
    ElementObj.Element.height = -(ElementObj.bottom - point.y)
}
export const handleResizeSideBottom = (ElementObj: resizeEleObjType, point: Point) => {
    if (point.y <= ElementObj.top) {
        ElementObj.Element.y = point.y
        ElementObj.Element.height = point.y - ElementObj.top
        return

    }
    ElementObj.Element.y = ElementObj.top
    ElementObj.Element.height = ElementObj.top - point.y
}
export const handleResizeSideLeft = (ElementObj: resizeEleObjType, point: Point) => {
    if (point.x >= ElementObj.right) {
        ElementObj.Element.x = ElementObj.right
        ElementObj.Element.width = ElementObj.right - point.x
        return
    }
    ElementObj.Element.x = point.x

    ElementObj.Element.width = -(ElementObj.right - point.x)

}
export const handleResizeSideRight = (ElementObj: resizeEleObjType, point: Point) => {
    if (point.x <= ElementObj.left) {
        ElementObj.Element.x = point.x
        ElementObj.Element.width = point.x - ElementObj.left
        return

    }
    ElementObj.Element.x = ElementObj.left
    ElementObj.Element.width = ElementObj.left - point.x
}
export const handleResizeSquareTopLeft = (ElementObj: resizeEleObjType, point: Point) => {
    handleResizeSideLeft(ElementObj, point)
    handleResizeSideTop(ElementObj, point)
}
export const handleResizeSquareTopRight = (ElementObj: resizeEleObjType, point: Point) => {
    handleResizeSideRight(ElementObj, point)
    handleResizeSideTop(ElementObj, point)
}
export const handleResizeSquareBottomLeft = (ElementObj: resizeEleObjType, point: Point) => {
    handleResizeSideLeft(ElementObj, point)
    handleResizeSideBottom(ElementObj, point)
}
export const handleResizeSquareBottomRight = (ElementObj: resizeEleObjType, point: Point) => {
    handleResizeSideRight(ElementObj, point)
    handleResizeSideBottom(ElementObj, point)
}

export const handleResizeLeftCircle = (ElementObj: resizeEleObjType, point: Point) => {
    ElementObj.Element.x = point.x
    ElementObj.Element.y = point.y
    ElementObj.Element.height = point.y - ElementObj.bottom
    ElementObj.Element.width = point.x - ElementObj.right
}
export const handleResizeRightCircle = (ElementObj: resizeEleObjType, point: Point) => {
    ElementObj.Element.x = ElementObj.left
    ElementObj.Element.y = ElementObj.top
    ElementObj.Element.height = ElementObj.top - point.y
    ElementObj.Element.width = ElementObj.left - point.x
}

export const findResizeSideAndAddResizeRef = (SelectedElement: Element, point: Point, Elements: Element[], curruntResizeElement: React.RefObject<resizeEleObjType | null>, setSelectedElement: Dispatch<SetStateAction<Element | null>>) => {

    let touched = false
    const ResizeElementObj: resizeEleObjType = {
        Element: SelectedElement,
        index: null,
        top: SelectedElement.y,
        bottom: SelectedElement.y - SelectedElement.height,
        contactPoint: "none",
        movement: "Still",
        left: SelectedElement.x,
        right: SelectedElement.x - SelectedElement.width
    }
    if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {

        if (isPointNearLine(SelectedElement.x, SelectedElement.y, 0, SelectedElement.width, point)) {
            ResizeElementObj.contactPoint = "TopSide"
        }
        if (isPointNearLine(SelectedElement.x, SelectedElement.y - SelectedElement.height, 0, SelectedElement.width, point)) {
            ResizeElementObj.contactPoint = "BottomSide"
        }
        if (isPointNearLine(SelectedElement.x, SelectedElement.y, SelectedElement.height, 0, point)) {
            ResizeElementObj.contactPoint = "LeftSide"
        }
        if (isPointNearLine(SelectedElement.x - SelectedElement.width, SelectedElement.y, SelectedElement.height, 0, point)) {
            ResizeElementObj.contactPoint = "RightSide"
        }

        if (isPointOnTopLeftSquare(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
            ResizeElementObj.contactPoint = "TopLeftSquare"
        }
        if (isPointOnTopRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y, 9, 9, point)) {
            ResizeElementObj.contactPoint = "TopRightSquare"
        }
        if (isPointOnBottomLeftSquare(SelectedElement.x, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            ResizeElementObj.contactPoint = "BottomLeftSquare"
        }
        if (isPointOnBottomRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            ResizeElementObj.contactPoint = "BottomRightSquare"
        }

    }
    if (SelectedElement.type === "line" || SelectedElement.type === "arrow") {
        if (isPointOnSmallCircle(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
            ResizeElementObj.contactPoint = "LeftCircle"
        }
        if (isPointOnSmallCircle(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            ResizeElementObj.contactPoint = "RightCircle"
        }
    }

    if (ResizeElementObj.contactPoint != "none") {
        touched = true
        const index = Elements.findIndex((a) => a.id === SelectedElement.id)
        if (index >= 0) {
            ResizeElementObj.index = index
            curruntResizeElement.current = ResizeElementObj
        }
        return touched
    }


    return touched

}
export const findMoveTargetAndAddMoveRef = (SelectedElement: Element, point: Point, Elements: Element[], curruntMoveElement: React.RefObject<MoveEleObjType | null>, setSelectedElement: Dispatch<SetStateAction<Element | null>>) => {
    let touched = false
    if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {

        if (ispointInBoundedBox(SelectedElement.x, SelectedElement.y, SelectedElement.height, SelectedElement.width, point)) {
            const MoveElementObj: MoveEleObjType = {
                point,
                Element: SelectedElement,
                index: null,
                fromTop: point.y - SelectedElement.y,
                fromLeft: point.x - SelectedElement.x,
                movement: "Still"
            }
            const index = Elements.findIndex((a) => a.id === SelectedElement.id)
            if (index >= 0) {
                MoveElementObj.index = index
                curruntMoveElement.current = MoveElementObj
            }
            touched = true
        }
    }

    if (SelectedElement.type === "line" || SelectedElement.type === "arrow") {

        if (isPointNearLine(SelectedElement.x, SelectedElement.y, SelectedElement.height, SelectedElement.width, point)) {
            const MoveElementObj: MoveEleObjType = {
                point,
                Element: SelectedElement,
                index: null,
                fromTop: point.y - SelectedElement.y,
                fromLeft: point.x - SelectedElement.x,
                movement: "Still"
            }
            const index = Elements.findIndex((a) => a.id === SelectedElement.id)
            if (index >= 0) {
                MoveElementObj.index = index
                curruntMoveElement.current = MoveElementObj
            }
            touched = true

        }
    }

    return touched
}

function HandleFreedrawResize(
    curruntResizeMoveElementObj: React.RefObject<resizeEleObjType | null>,
    point: Point
) {
    if (curruntResizeMoveElementObj.current?.Element.type !== "freedraw") return

    const anchorPoints = curruntResizeMoveElementObj.current?.Element.SnapshotPoints
    const ele = curruntResizeMoveElementObj.current.Element
    const Refobj = curruntResizeMoveElementObj.current
    switch (curruntResizeMoveElementObj.current?.contactPoint) {
        case "TopSide":
            const newarrTop: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratio = (pt.y - Refobj.top) / (Refobj.bottom - Refobj.top)

                const newYfromTop = ratio * (point.y - Refobj.bottom)

                const newY = point.y - newYfromTop

                return {
                    ...pt,
                    y: newY
                }
            })
            ele.points = newarrTop
            break;
        case "BottomSide":
            const newarBottom: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratio = (pt.y - Refobj.bottom) / (Refobj.top - Refobj.bottom)

                const newYfrombottom = ratio * (point.y - Refobj.top)

                const newY = point.y - newYfrombottom

                return {
                    ...pt,
                    y: newY
                }
            })
            ele.points = newarBottom
            break;
        case "LeftSide":
            const newarrLeft: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratio = (pt.x - Refobj.left) / (Refobj.right - Refobj.left)

                const newXfromLeft = ratio * (point.x - Refobj.right)

                const newX = point.x - newXfromLeft

                return {
                    ...pt,
                    x: newX
                }
            })
            ele.points = newarrLeft
            break;
        case "RightSide":
            const newarrRight: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratio = (pt.x - Refobj.right) / (Refobj.left - Refobj.right)

                const newXfromRight = ratio * (point.x - Refobj.left)

                const newX = point.x - newXfromRight

                return {
                    ...pt,
                    x: newX
                }
            })
            ele.points = newarrRight
            break;
        case "TopLeftSquare":
            const newarrTopLeft: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratioY = (pt.y - Refobj.top) / (Refobj.bottom - Refobj.top)
                const ratioX = (pt.x - Refobj.left) / (Refobj.right - Refobj.left)

                const newYfromTop = ratioY * (point.y - Refobj.bottom)
                const newXfromLeft = ratioX * (point.x - Refobj.right)

                const newY = point.y - newYfromTop
                const newX = point.x - newXfromLeft

                return {
                    ...pt,
                    x: newX,
                    y: newY
                }
            })
            ele.points = newarrTopLeft
            break;



        case "TopRightSquare":
            const newarrTopright: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratioY = (pt.y - Refobj.top) / (Refobj.bottom - Refobj.top)
                const ratioX = (pt.x - Refobj.right) / (Refobj.left - Refobj.right)

                const newYfromTop = ratioY * (point.y - Refobj.bottom)
                const newXfromRight = ratioX * (point.x - Refobj.left)

                const newY = point.y - newYfromTop
                const newX = point.x - newXfromRight

                return {
                    ...pt,
                    x: newX,
                    y: newY
                }
            })
            ele.points = newarrTopright
            break;


        case "BottomLeftSquare":
            const newarrBottomLeft: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratioY = (pt.y - Refobj.bottom) / (Refobj.top - Refobj.bottom)
                const ratioX = (pt.x - Refobj.left) / (Refobj.right - Refobj.left)

                const newYfrombottom = ratioY * (point.y - Refobj.top)
                const newXfromLeft = ratioX * (point.x - Refobj.right)

                const newY = point.y - newYfrombottom
                const newX = point.x - newXfromLeft

                return {
                    ...pt,
                    x: newX,
                    y: newY
                }
            })
            ele.points = newarrBottomLeft
            break;


        case "BottomRightSquare":

            const newarrBottomRight: Point[] = ele.SnapshotPoints.map((pt) => {

                const ratioY = (pt.y - Refobj.bottom) / (Refobj.top - Refobj.bottom)
                const ratioX = (pt.x - Refobj.right) / (Refobj.left - Refobj.right)

                const newYfrombottom = ratioY * (point.y - Refobj.top)
                const newXfromRight = ratioX * (point.x - Refobj.left)

                const newY = point.y - newYfrombottom
                const newX = point.x - newXfromRight

                return {
                    ...pt,
                    x: newX,
                    y: newY
                }
            })
            ele.points = newarrBottomRight
            break;


    }

}