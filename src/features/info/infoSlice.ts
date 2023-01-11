import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Point {
  row: number;
  col: number;
}

export type currentActionType = "START" | "END" | "WALLS" | "NONE";
export type algorithmsType = "DFS" | "BFS" | "DIJKSTRA";
const ACTION_TYPES:currentActionType[] = ["START","END","WALLS"]

export interface InfoState {
  algorithm: algorithmsType;
  start: Point;
  end: Point;
  currentAction: currentActionType;
  rows: number;
  cols: number;
  speed: number;
  isRunning: boolean;
  isFinished: boolean;
  isPaused: boolean;
}

const initialState: InfoState = {
  algorithm: "BFS",
  start: {
    row: 0,
    col: 0,
  },
  end: {
    row: 0,
    col: 0,
  },
  currentAction: "START",
  rows: 10,
  cols: 10,
  speed: 100,
  isRunning: false,
  isFinished: false,
  isPaused: false,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setAlgorithm: (state, action: PayloadAction<algorithmsType>) => {
      state.algorithm = action.payload;
    },
    setStart: (state, action: PayloadAction<Point>) => {
      state.start = {
        row: action.payload.row,
        col: action.payload.col,
      };
      state.currentAction = "END";
    },
    setEnd: (state, action: PayloadAction<Point>) => {
      state.end = {
        row: action.payload.row,
        col: action.payload.col,
      };
      state.currentAction = "WALLS";
    },
    setCurrentAction: (
      state,
      action: PayloadAction<currentActionType>
    ) => {
      state.currentAction = action.payload;
    },
    setNextAction : (state) => {
      switch(state.currentAction){
        case "START": 
          state.currentAction = "END"
          break
        case "END": 
          state.currentAction = "WALLS"
          break
        default:
          break
      }
    },
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
    },
    setCols: (state, action: PayloadAction<number>) => {
      state.cols = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
  },
});

export const {
  setAlgorithm,
  setStart,
  setEnd,
  setCurrentAction,
  setNextAction,
  setRows,
  setCols,
  setSpeed,
  setIsRunning,
  setIsFinished,
  setIsPaused,
} = infoSlice.actions;

//selectors 
export const selectAlgorithm  = (state: RootState) => state.info.algorithm;
export const selectStart = (state: RootState) => state.info.start;
export const selectEnd = (state: RootState) => state.info.end;
export const selectCurrentAction = (state: RootState) => state.info.currentAction;
export const selectRows = (state: RootState) => state.info.rows;
export const selectCols = (state: RootState) => state.info.cols;
export const selectSpeed = (state: RootState) => state.info.speed;
export const selectIsRunning = (state: RootState) => state.info.isRunning;
export const selectIsFinished = (state: RootState) => state.info.isFinished;
export const selectIsPaused = (state: RootState) => state.info.isPaused;

export default infoSlice.reducer;
