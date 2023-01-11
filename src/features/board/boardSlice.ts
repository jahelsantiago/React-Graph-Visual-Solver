import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { currentActionType } from "../info/infoSlice";

type blocKind = "START" | "END" | "WALLS" | "NONE";
export type graphBlock = "PATH" | "VISITED" | "CURRENT" | blocKind
export type graphMatrix =  graphBlock[][]

type boardState = {
  squares: graphMatrix;
  mouseDown: boolean;
}

const initialState : boardState = {
  squares: Array(10).fill(Array(10).fill("NONE")),
  mouseDown: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSquare: (
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        currentAction: currentActionType;
      }>
    ) => {
      const { row, col, currentAction } = action.payload;
      state.squares[row][col] = currentAction;
    },
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.mouseDown = action.payload;
    },
  },
});

export const { setMouseDown, setSquare } = boardSlice.actions;

export const selectMouseDown = (state: RootState) => state.board.mouseDown;

export default boardSlice.reducer;
