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

        if (SelectedElement.type === "rectangle" || SelectedElement.type === "ellipse" || SelectedElement.type === "diamond" || SelectedElement.type === "freedraw") {
            if (isPointOnTopLeftSquare(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
                canvas.style.cursor = "nwse-resize";
                return
            }
            if (isPointOnTopRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y, 9, 9, point)) {
                canvas.style.cursor = "nesw-resize";
                return

            }
            if (isPointOnBottomRightSquare(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
                canvas.style.cursor = "nwse-resize";
                return

            }
            if (isPointOnBottomLeftSquare(SelectedElement.x, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
                canvas.style.cursor = "nesw-resize";
                return
            }

            if (isPointNearLine(SelectedElement.x, SelectedElement.y, 0, SelectedElement.width, point)) {
                canvas.style.cursor = "ns-resize";
                return
            }
            if (isPointNearLine(SelectedElement.x, SelectedElement.y - SelectedElement.height, 0, SelectedElement.width, point)) {
                canvas.style.cursor = "ns-resize";
                return
            }

            if (isPointNearLine(SelectedElement.x, SelectedElement.y, SelectedElement.height, 0, point)) {
                canvas.style.cursor = "ew-resize";
                return
            }
            if (isPointNearLine(SelectedElement.x - SelectedElement.width, SelectedElement.y, SelectedElement.height, 0, point)) {
                canvas.style.cursor = "ew-resize";
                return
            }


        }
        if (SelectedElement.type === "line" || SelectedElement.type === "arrow") {
            if (isPointOnSmallCircle(SelectedElement.x, SelectedElement.y, 9, 9, point)) {
                canvas.style.cursor = "pointer";
                return
            }
            if (isPointOnSmallCircle(SelectedElement.x - SelectedElement.width, SelectedElement.y - SelectedElement.height, 9, 9, point)) {
                canvas.style.cursor = "pointer";
                return
            }
        }

        // return
    }
    if (MultipleSelectedElements) {
        if (!DimentionsMutipleSelectionBox || !DimentionsMutipleSelectionBox.left || !DimentionsMutipleSelectionBox.right || !DimentionsMutipleSelectionBox.top || !DimentionsMutipleSelectionBox.bottom) return

        if (ispointInBoundedBox(DimentionsMutipleSelectionBox.left, DimentionsMutipleSelectionBox.top, DimentionsMutipleSelectionBox?.top - DimentionsMutipleSelectionBox?.bottom, DimentionsMutipleSelectionBox?.left - DimentionsMutipleSelectionBox?.right, point)) {
            canvas.style.cursor = "move"
            return
        }

        const x = DimentionsMutipleSelectionBox.left
        const y = DimentionsMutipleSelectionBox.top
        const width = DimentionsMutipleSelectionBox.left - DimentionsMutipleSelectionBox.right
        const height = DimentionsMutipleSelectionBox.top - DimentionsMutipleSelectionBox.bottom

        if (isPointOnTopLeftSquare(x, y, 9, 9, point)) {
            canvas.style.cursor = "nwse-resize";
            return
        }
        if (isPointOnTopRightSquare(x - width, y, 9, 9, point)) {
            canvas.style.cursor = "nesw-resize";
            return
        }
        if (isPointOnBottomRightSquare(x - width, y - height, 9, 9, point)) {
            canvas.style.cursor = "nwse-resize";
            return
        }
        if (isPointOnBottomLeftSquare(x, y - height, 9, 9, point)) {
            canvas.style.cursor = "nesw-resize";
            return
        }

        if (isPointNearLine(x, y, 0, width, point)) {
            canvas.style.cursor = "ns-resize";
            return
        }
        if (isPointNearLine(x, y - height, 0, width, point)) {
            canvas.style.cursor = "ns-resize";
            return
        }

        if (isPointNearLine(x, y, height, 0, point)) {
            canvas.style.cursor = "ew-resize";
            return
        }
        if (isPointNearLine(x - width, y, height, 0, point)) {
            canvas.style.cursor = "ew-resize";
            return
        }
    }

    const hitted = hitTest(point, Elements)

    if (hitted) {
        canvas.style.cursor = "move";
    } else {
        canvas.style.cursor = "auto";
    }


}
