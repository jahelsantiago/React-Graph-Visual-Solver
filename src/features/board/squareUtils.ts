import { AppDispatch } from "../../app/store";
import { currentActionType, Point } from "../info/infoSlice";
import { setSquare } from "./boardSlice";

export function cleanPreviewsPoints(dispatch:AppDispatch, currentAction: currentActionType, start: Point, end: Point){
    switch(currentAction){
        case "START":
            if(isPointIstantiated(start)) {
                dispatch(setSquare({ row: start.row, col: start.col, currentAction: "NONE" }));
            }
            break
        case "END":
            if(isPointIstantiated(end)) {
                dispatch(setSquare({ row: end.row, col: end.col, currentAction: "NONE" }));
            }
            break
        default:
            break
    }
} 

function isPointIstantiated(point: Point){
    return point.row !== -1 && point.col !== -1
}