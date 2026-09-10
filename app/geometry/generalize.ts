import { Element } from "../lib/whiteboard/tools/types"

export function generalize(ele: Element) {
    const newele = ele
    const left = Math.min(ele.x, ele.x - ele.width)
    const right = Math.max(ele.x, ele.x - ele.width)
    const top = Math.min(ele.y, ele.y - ele.height)
    const bottom = Math.max(ele.y, ele.y - ele.height)

    const newHeight = top - bottom
    const newWidth = left - right

    newele.x = left
    newele.y = top
    newele.height = newHeight
    newele.width = newWidth

    return newele
}