import { MultipleResizeEleObjType, Point, resizeEleObjType } from "@/app/lib/whiteboard/tools/types"

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

export const handleMultipleResizeSideTop = (
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    point: Point,

) => {

    const Refobj = ResizeMultipleSelectObj.current
    if (!Refobj || !Refobj.ElementsAndIndex || !Refobj.SnapShotElements || !Refobj.contactPoint || !Refobj.dimentions || !Refobj.snapShotdimentions || !Refobj.movement || !Refobj.point) return

    const { snapShotdimentions, dimentions, SnapShotElements, ElementsAndIndex } = Refobj;
    const { left, right, top, bottom } = snapShotdimentions

    if (top == null || left == null || bottom == null || right == null) return
    if (dimentions.bottom == null || dimentions.top == null || dimentions.left == null || dimentions.right == null) return

    const SnapBoxHeight = bottom - top
    const CrrboxHeight = bottom - point.y
    if (CrrboxHeight === 0) return

    const ratio = CrrboxHeight / SnapBoxHeight

    SnapShotElements?.forEach((SnapElement, index) => {

        const SnapELeYfromTop = SnapElement.y - top;
        const ratioY = SnapELeYfromTop / SnapBoxHeight;


        ElementsAndIndex[index].element.y = point.y + (CrrboxHeight * ratioY);
        ElementsAndIndex[index].element.height = SnapElement.height * ratio;

    })
    Refobj.dimentions.top = point.y
    Refobj.point = point
}


export const handleMultipleResizeSideBottom = (
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    point: Point,

) => {
    const Refobj = ResizeMultipleSelectObj.current
    if (!Refobj || !Refobj.ElementsAndIndex || !Refobj.SnapShotElements || !Refobj.contactPoint || !Refobj.dimentions || !Refobj.snapShotdimentions || !Refobj.movement || !Refobj.point) return

    const { snapShotdimentions, dimentions, SnapShotElements, ElementsAndIndex } = Refobj;
    const { left, right, top, bottom } = snapShotdimentions

    if (top == null || left == null || bottom == null || right == null) return
    if (dimentions.bottom == null || dimentions.top == null || dimentions.left == null || dimentions.right == null) return

    const SnapBoxHeight = bottom - top
    const CrrboxHeight = point.y - top
    if (CrrboxHeight === 0) return

    const ratio = CrrboxHeight / SnapBoxHeight

    SnapShotElements?.forEach((SnapElement, index) => {

        const SnapELeYfromBottom = SnapElement.y - bottom;
        const ratioY = SnapELeYfromBottom / SnapBoxHeight;

        ElementsAndIndex[index].element.y = point.y + (CrrboxHeight * ratioY);
        ElementsAndIndex[index].element.height = SnapElement.height * ratio;

    })
    Refobj.dimentions.bottom = point.y
    Refobj.point = point
}

export const handleMultipleResizeSideLeft = (
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    point: Point,

) => {
    console.log("left")

    const Refobj = ResizeMultipleSelectObj.current
    if (!Refobj || !Refobj.ElementsAndIndex || !Refobj.SnapShotElements || !Refobj.contactPoint || !Refobj.dimentions || !Refobj.snapShotdimentions || !Refobj.movement || !Refobj.point) return

    const { snapShotdimentions, dimentions, SnapShotElements, ElementsAndIndex } = Refobj;
    const { left, right, top, bottom } = snapShotdimentions

    if (top == null || left == null || bottom == null || right == null) return
    if (dimentions.bottom == null || dimentions.top == null || dimentions.left == null || dimentions.right == null) return

    const SnapBoxWidth = right - left
    const CrrboxWidth = right - point.x
    console.log(CrrboxWidth)
    if (CrrboxWidth === 0) return

    const ratio = CrrboxWidth / SnapBoxWidth

    SnapShotElements?.forEach((SnapElement, index) => {

        const SnapELeXfromLeft = SnapElement.x - left;
        const ratioX = SnapELeXfromLeft / SnapBoxWidth;


        ElementsAndIndex[index].element.x = point.x + (CrrboxWidth * ratioX);
        ElementsAndIndex[index].element.width = SnapElement.width * ratio;

    })
    Refobj.dimentions.left = point.x
    Refobj.point = point
}
export const handleMultipleResizeSideRight = (
    ResizeMultipleSelectObj: React.RefObject<MultipleResizeEleObjType | null>,
    point: Point,

) => {
    // const Refobj = ResizeMultipleSelectObj.current
    // if (!Refobj || !Refobj.ElementsAndIndex || !Refobj.SnapShotElements || !Refobj.contactPoint || !Refobj.dimentions || !Refobj.snapShotdimentions || !Refobj.movement || !Refobj.point) return

    // const { snapShotdimentions, dimentions, SnapShotElements, ElementsAndIndex } = Refobj;
    // const { left, right, top, bottom } = snapShotdimentions

    // if (top == null || left == null || bottom == null || right == null) return
    // if (dimentions.bottom == null || dimentions.top == null || dimentions.left == null || dimentions.right == null) return

    // const SnapBoxWidth = right - left
    // const CrrboxWidth = point.x - left
    // if (CrrboxWidth === 0) return

    // const ratio = CrrboxWidth / SnapBoxWidth

    // SnapShotElements?.forEach((SnapElement, index) => {

    //     const SnapELeXfromRight = SnapElement.x - right;
    //     const ratioX = SnapELeXfromRight / SnapBoxWidth;

    //     ElementsAndIndex[index].element.x = point.x + (CrrboxWidth * ratioX);
    //     ElementsAndIndex[index].element.width = SnapElement.width * ratio;

    // })
    // Refobj.dimentions.right = point.x
    // Refobj.point = point

    console.log("right")
    const Refobj = ResizeMultipleSelectObj.current

    if (
        !Refobj ||
        !Refobj.ElementsAndIndex ||
        !Refobj.SnapShotElements ||
        !Refobj.contactPoint ||
        !Refobj.dimentions ||
        !Refobj.snapShotdimentions ||
        !Refobj.movement ||
        !Refobj.point
    ) return

    const { snapShotdimentions, dimentions, SnapShotElements, ElementsAndIndex } = Refobj
    const { left, right, top, bottom } = snapShotdimentions

    if (top == null || left == null || bottom == null || right == null) return

    if (
        dimentions.bottom == null ||
        dimentions.top == null ||
        dimentions.left == null ||
        dimentions.right == null
    ) return

    const SnapBoxWidth = Math.round(right - left)
    const CrrboxWidth = Math.round(point.x - left)
    console.log(CrrboxWidth)
    if (CrrboxWidth === 0) return

    const ratio = CrrboxWidth / SnapBoxWidth

    SnapShotElements?.forEach((SnapElement, index) => {
        const SnapELeXfromRight = Math.round(SnapElement.x - right)
        const ratioX = SnapELeXfromRight / SnapBoxWidth

        ElementsAndIndex[index].element.x = Math.round(
            point.x + (CrrboxWidth * ratioX)
        )

        ElementsAndIndex[index].element.width = Math.round(
            SnapElement.width * ratio
        )
        console.log(ElementsAndIndex[index].element.x, ElementsAndIndex[index].element.width)
    })

    Refobj.dimentions.right = Math.round(point.x)
    Refobj.point = {
        x: Math.round(point.x),
        y: Math.round(point.y)
    }
}

