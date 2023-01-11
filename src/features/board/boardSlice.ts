import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { currentActionType } from "../info/infoSlice";

let ROWS = process.env.REACT_APP_ROWS;
let REACT_APP_ROWS = ROWS ? parseInt(ROWS) : 20;
let COLS = process.env.REACT_APP_COLS;
let REACT_APP_COLS = COLS ? parseInt(COLS) : 20;

type blocKind = "START" | "END" | "WALLS" | "NONE";
export type graphBlock = "PATH" | "VISITED" | "CURRENT" | "FINISHED" | blocKind
export type graphMatrix =  graphBlock[][]

type boardState = {
  squares: graphMatrix;
  mouseDown: boolean;
}

const initialState : boardState = {
  squares: Array(REACT_APP_ROWS).fill(Array(REACT_APP_COLS).fill("NONE")),
  mouseDown: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<{row: number; col: number; currentAction: currentActionType;}>) => {
      const { row, col, currentAction } = action.payload;
      state.squares[row][col] = currentAction;
    },
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.mouseDown = action.payload;
    },
    setSquares: (state, action: PayloadAction<graphMatrix>) => {
      state.squares = action.payload;
    },
  },
});

export const { setMouseDown, setSquare, setSquares } = boardSlice.actions;

export const selectMouseDown = (state: RootState) => state.board.mouseDown;

export default boardSlice.reducer;
