import { drawArrow, drawdiamond, drawEllipse, drawFreedraw, drawLine, drawMutlipleSelectionFrame, drawRectangle, drawSelectionForLine, drawSelectionFrame, drawSelectionFrameDashedSecondaryInputs, drawSelectionFrameWithoutHandles, drawText } from "./drawing"
import { DimentionsMultipleSelectBox, Element, MoveMultipleEleObjType, MultipleSelectObjType } from "./tools/types"


export const renderAll = (
    ctx: CanvasRenderingContext2D,
    Elements: Element[],
    rect: DOMRect,
    selectedElement: Element | null,
    ResizeElement: Element | null,
    MultipleSelectObj: React.RefObject<MultipleSelectObjType | null> | null,
    MultipleSelectedElements: Element[] | null,
    DimentionsMutipleSelectionBox: DimentionsMultipleSelectBox | null,
    MoveMultipleSelectObj: React.RefObject<MoveMultipleEleObjType | null>


) => {
    ctx.clearRect(0, 0, rect.width, rect.height)

    Elements.forEach((el) => {
        if (el.type === "line") {
            drawLine(ctx, el)
        }
        if (el.type === "arrow") {
            drawArrow(ctx, el)
        }
        if (el.type === "freedraw") {
            drawFreedraw(ctx, el)
        }
        if (el.type === "rectangle") {
            drawRectangle(ctx, el)
        }
        if (el.type === "diamond") {
            drawdiamond(ctx, el)
        }
        if (el.type === "ellipse") {
            drawEllipse(ctx, el)
        }
        if (el.type === "text") {
            drawText(ctx, el)
        }
    })

    if (selectedElement) {
        if (
            selectedElement.type === "rectangle" ||
            selectedElement.type === "diamond" ||
            selectedElement.type === "ellipse" ||
            selectedElement.type === "freedraw"
        ) {
            drawSelectionFrame(ctx, selectedElement)
        }
        if (selectedElement.type === "line" || selectedElement.type === "arrow") {
            drawSelectionForLine(ctx, selectedElement)
        }
    }

    if (ResizeElement) {
        if (ResizeElement.type === "line") {
            drawLine(ctx, ResizeElement)
        }
        if (ResizeElement.type === "arrow") {
            drawArrow(ctx, ResizeElement)
        }
        if (ResizeElement.type === "freedraw") {
            drawFreedraw(ctx, ResizeElement)
        }
        if (ResizeElement.type === "rectangle") {
            drawRectangle(ctx, ResizeElement)
        }
        if (ResizeElement.type === "diamond") {
            drawdiamond(ctx, ResizeElement)
        }
        if (ResizeElement.type === "ellipse") {
            drawEllipse(ctx, ResizeElement)
        }
        if (ResizeElement.type === "text") {
            drawText(ctx, ResizeElement)
        }
    }

    if (MultipleSelectObj) {
        drawMutlipleSelectionFrame(ctx, MultipleSelectObj)

        if (MultipleSelectObj.current?.MultipleSelectedElements && MultipleSelectObj.current?.MultipleSelectedElements?.length > 0) {
            handleMutltipleSelectionBox(MultipleSelectObj.current.MultipleSelectedElements, MultipleSelectObj.current.dimentionsInnerBox, ctx)
        }
    }

    if (MultipleSelectedElements && DimentionsMutipleSelectionBox) {

        handleMutltipleSelectionBox(MultipleSelectedElements, DimentionsMutipleSelectionBox, ctx)

    }

    if (MoveMultipleSelectObj) {
        // handleMutltipleMoveBox(MoveMultipleSelectObj, DimentionsMutipleSelectionBox, ctx)
        const Elements = MoveMultipleSelectObj.current?.ElementsAndIndex?.map(a => a.element)
        const DimentionBox = MoveMultipleSelectObj.current?.DimentionBox
        if (!Elements || !DimentionBox) return

        handleMutltipleMoveBox(Elements, DimentionBox, ctx)


    }
}



function handleMutltipleSelectionBox(
    Elements: Element[],
    Dimentions: DimentionsMultipleSelectBox | null,
    ctx: CanvasRenderingContext2D,
) {

    if (Elements.length && Elements.length === 1) {
        const el = Elements[0]
        drawSelectionFrame(ctx, el)
    }
    if (Elements.length && Elements.length > 0) {

        const dimentions = Dimentions
        if (!dimentions?.left || !dimentions?.right || !dimentions?.top || !dimentions?.bottom) return
        drawSelectionFrameDashedSecondaryInputs(ctx, dimentions?.left, dimentions?.top, dimentions?.left - dimentions?.right, dimentions?.top - dimentions?.bottom)

        Elements.map((ele) => {
            drawSelectionFrameWithoutHandles(ctx, ele)
        })
    }
}
function handleMutltipleMoveBox(
    Elements: Element[],
    Dimentions: DimentionsMultipleSelectBox | null,
    ctx: CanvasRenderingContext2D,
) {
    if (Elements.length && Elements.length === 1) {
        const el = Elements[0]
        drawSelectionFrame(ctx, el)
    }
    if (Elements.length && Elements.length > 0) {

        const dimentions = Dimentions
        if (!dimentions?.left || !dimentions?.right || !dimentions?.top || !dimentions?.bottom) return
        drawSelectionFrameDashedSecondaryInputs(ctx, dimentions?.left, dimentions?.top, dimentions?.left - dimentions?.right, dimentions?.top - dimentions?.bottom)

        Elements.map((el) => {
            drawSelectionFrameWithoutHandles(ctx, el)
            if (el.type === "line") {
                drawLine(ctx, el)
            }
            if (el.type === "arrow") {
                drawArrow(ctx, el)
            }
            if (el.type === "freedraw") {
                drawFreedraw(ctx, el)
            }
            if (el.type === "rectangle") {
                drawRectangle(ctx, el)
            }
            if (el.type === "diamond") {
                drawdiamond(ctx, el)
            }
            if (el.type === "ellipse") {
                drawEllipse(ctx, el)
            }
            if (el.type === "text") {
                drawText(ctx, el)
            }

        })
    }
} 