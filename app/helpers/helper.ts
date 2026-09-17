import { Element } from "../lib/whiteboard/tools/types";


export function fullCopyOfElements(Element: Element[]) {
    const copyElements = Element.map(E => {
        if (E.type === "freedraw") {
            const copyPoints = E.points.map(P => {
                return {
                    x: P.x,
                    y: P.y
                }
            })
            const snapshotPoints = copyPoints.map(P => {
                return {
                    x: P.x,
                    y: P.y
                }
            })
            return {
                ...E,
                points: copyPoints,
                SnapshotPoints: snapshotPoints
            }
        }
        return { ...E }
    })
    return copyElements
}
export function fullCopyOfSingleElement(Element: Element): Element {
    if (Element.type === "freedraw") {
        const copyPoints = Element.points.map(P => {
            return {
                x: P.x,
                y: P.y
            }
        })
        const snapshotPoints = copyPoints.map(P => {
            return {
                x: P.x,
                y: P.y
            }
        })
        return {
            ...Element,
            points: copyPoints,
            SnapshotPoints: snapshotPoints
        }
    }
    return { ...Element }
}