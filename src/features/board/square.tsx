import PropTypes from "prop-types";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { currentActionType, Point, selectEnd, selectStart, setNextAction, setStart } from "../info/infoSlice";
import { graphBlock, selectMouseDown, setMouseDown, setSquare } from "./boardSlice";
import { cleanPreviewsPoints } from "./squareUtils";

interface Props extends PropsFromRedux {
  className?: string;
  row: number;
  col: number;
}


function getClass(squareState : graphBlock){
  switch(squareState){
    case "START":
      return "bg-green-500"
    case "END":
      return "bg-red-500"
    case "WALLS":
      return "bg-gray-800"
    case "NONE":
      return "bg-slate-500"
    case "PATH":
      return "bg-blue-500"
    case "VISITED":
      return "bg-yellow-500"
    case "CURRENT":
      return "bg-purple-500"
    case "FINISHED":
      return "bg-green-500"
    default:
      return "bg-slate-500"
  }
}

export const square = (props: Props) => {
  const squareState = props.squareState(props.row, props.col);
  return (
    <div
      className={getClass(squareState) + " " + "rounded-sm cursor-pointer"}
      onMouseDown={props.setMouseDown}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col, props.isMouseDown, props.currentAction)}
      onMouseUp={props.setMouseUp}
      onClick={() => props.onClick(props.row, props.col, props.currentAction, props.start, props.end)}
    >
      
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentAction: state.info.currentAction,
  squareState: (row: number, col: number) => state.board.squares[row][col],
  start: selectStart(state),
  end: selectEnd(state),
  isMouseDown: selectMouseDown(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setMouseDown: () => dispatch(setMouseDown(true)),
  setMouseUp: () => dispatch(setMouseDown(false)),
  onClick: (row: number, col: number, currentAction: currentActionType, start: Point, end:Point) => {
    if (currentAction === "NONE") return; // do nothing
    cleanPreviewsPoints(dispatch, currentAction, start, end); // clean previews points
    dispatch(setSquare({ row, col, currentAction })); // set the new point
    dispatch(setNextAction()); // set the next action
  },
  onMouseEnter: (row: number, col: number, isMouseDown: boolean, currentAction: currentActionType) => {
    if(!isMouseDown) return;
    if(currentAction !== "WALLS") return;
    dispatch(setSquare({ row, col, currentAction })); // set the new point
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(square);
