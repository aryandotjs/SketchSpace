import React from "react";
import { MoveEleObjType, Point } from "../lib/whiteboard/tools/types";


export const moveElement = (curruntMoveElementObj: React.RefObject<MoveEleObjType | null>, point: Point) => {
    if (!curruntMoveElementObj.current) {
        return
    }
    const ele = curruntMoveElementObj.current.Element
    const eleObj = curruntMoveElementObj.current

    let dx = ele.x
    let dy = ele.y

    ele.x = + point.x - eleObj.fromLeft
    ele.y = point.y - eleObj.fromTop

    if (ele.type === "freedraw") {
        dx = dx - ele.x
        dy = dy - ele.y

        ele.points.map((a) => {
            a.x = a.x - dx
            a.y = a.y - dy
        })
    }

} 