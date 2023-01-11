import PropTypes from "prop-types";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { currentActionType, setNextAction } from "../info/infoSlice";
import { graphBlock, setMouseDown, setSquare } from "./boardSlice";

interface Props extends PropsFromRedux {
  className?: string;
  row: number;
  col: number;
}

const classes = {
  START: "bg-green-500",
  END: "bg-red-500",
  WALLS: "bg-gray-500",
  NONE: "bg-slate-500",
  PATH: "bg-blue-500",
  VISITED: "bg-yellow-500",
  CURRENT: "bg-purple-500",
};


export const square = (props: Props) => {
  const squareState = props.squareState(props.row, props.col);
  return (
    <div
      className={classes[squareState]}
      onMouseDown={props.setMouseDown}
      onMouseEnter={() => console.log("mouseEnter")}
      onMouseUp={props.setMouseUp}
      onClick={() => props.onClick(props.row, props.col, props.currentAction)}
    >
      {props.row} - {props.col} / {props.squareState(props.row, props.col)}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentAction: state.info.currentAction,
  squareState: (row: number, col: number) => state.board.squares[row][col],
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setMouseDown: () => dispatch(setMouseDown(true)),
  setMouseUp: () => dispatch(setMouseDown(false)),
  onClick: (row: number, col: number, currentAction: currentActionType) => {
    if (currentAction === "NONE") return; // do nothing
    dispatch(setSquare({ row, col, currentAction })); // set the square
    dispatch(setNextAction()); // set the next action
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(square);
