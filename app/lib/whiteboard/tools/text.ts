import { nanoid } from "nanoid"
import { Point, StrokeStyle, TextElement } from "./types"


export const onPointdowmText = (point: Point, strokeColor: string, strokeWidth: number, strokeStyle: StrokeStyle, opacity: number, backgroundColor: string): TextElement => {
    return {
        id: nanoid(),
        type: "text",
        x: point.x,
        y: point.y,
        height: 0,
        width: 0,
        strokeColor,
        strokeWidth,
        strokeStyle,
        backgroundColor,
        opacity,
        locked: false,
        angle: 0,
        text: 'Aryan',
        fontFamily: "",
        fontSize: 0,
        textAlign: "left",
        verticalAlign: "center"
    }
}