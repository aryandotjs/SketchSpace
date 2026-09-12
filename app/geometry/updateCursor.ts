import { ispointInBoundedBox } from "../lib/whiteboard/tools/rectangle";
import { DimentionsMultipleSelectBox, Element, Point } from "../lib/whiteboard/tools/types";
import { hitTest, isPointNearLine, isPointOnBottomLeftSquare, isPointOnBottomRightSquare, isPointOnSmallCircle, isPointOnTopLeftSquare, isPointOnTopRightSquare } from "./hitTest";



export const updateCursor = (
    canvas: HTMLCanvasElement,
    point: Point,
    Elements: Element[],
    SelectedElement: Element | null,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,


) => {
    if (SelectedElement) {

        if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {

            if (ispointInBoundedBox(SelectedElement.x, SelectedElement.y, SelectedElement.height, SelectedElement.width, point)) {
                canvas.style.cursor = "move"
                return
            }
        }

    }
    if (MultipleSelectedElements) {
        if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.right || !DimentionsMutipleSelectionBox.top || !DimentionsMutipleSelectionBox.bottom) return

        if (ispointInBoundedBox(DimentionsMutipleSelectionBox.left, DimentionsMutipleSelectionBox.top, DimentionsMutipleSelectionBox?.top - DimentionsMutipleSelectionBox?.bottom, DimentionsMutipleSelectionBox?.left - DimentionsMutipleSelectionBox?.right, point)) {
            canvas.style.cursor = "move"
            return
        }

    }
    const hitted = hitTest(point, Elements)

    if (hitted) {
        canvas.style.cursor = "move";
    } else {
        canvas.style.cursor = "auto";
    }
    if (!SelectedElement) {
        return
    }
    if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {
        if (isPointNearLine(SelectedElement.x, SelectedElement.y, 0, SelectedElement.width, point)) {
            canvas.style.cursor = "ns-resize";
        }
        if (isPointNearLine(SelectedElement.x, SelectedElement.y - SelectedElement.height, 0, SelectedElement.width, point)) {
            canvas.style.cursor = "ns-resize";
        }

        if (isPointNearLine(SelectedElement.x, SelectedElement.y, SelectedElement.height, 0, point)) {
            canvas.style.cursor = "ew-resize";
        }
        if (isPointNearLine(SelectedElement.x - SelectedElement.width, SelectedElement.y, SelectedElement.height, 0, point)) {
            canvas.style.cursor = "ew-resize";
        }

        if (isPointOnTopLeftSquare(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
            canvas.style.cursor = "nwse-resize";
        }
        if (isPointOnTopRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y, 9, 9, point)) {
            canvas.style.cursor = "nesw-resize";
        }
        if (isPointOnBottomRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            canvas.style.cursor = "nwse-resize";
        }
        if (isPointOnBottomLeftSquare(SelectedElement.x, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            canvas.style.cursor = "nesw-resize";
        }
    }
    if (SelectedElement.type === "line" || SelectedElement.type === "arrow") {
        if (isPointOnSmallCircle(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
            canvas.style.cursor = "pointer";
        }
        if (isPointOnSmallCircle(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
            canvas.style.cursor = "pointer";
        }
    }
}
