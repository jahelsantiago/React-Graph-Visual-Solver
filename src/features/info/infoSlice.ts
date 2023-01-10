import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Point {
  row: number;
  col: number;
}

export interface InfoState {
  algorithm: "DFS" | "BFS" | "NONE";
  start: Point;
  end: Point;
  currentAction: "START" | "END" | "WALLS" | "NONE";
  rows: number;
  cols: number;
  speed: number;
  isRunning: boolean;
  isFinished: boolean;
  isPaused: boolean;
}

const initialState: InfoState = {
  algorithm: "NONE",
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
    setAlgorithm: (state, action: PayloadAction<"DFS" | "BFS" | "NONE">) => {
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
      action: PayloadAction<"START" | "END" | "WALLS" | "NONE">
    ) => {
      state.currentAction = action.payload;
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
  setRows,
  setCols,
  setSpeed,
  setIsRunning,
  setIsFinished,
  setIsPaused,
} = infoSlice.actions;

//selectors 
export const selectAlgorithm = (state: any) => state.info.algorithm;
export const selectStart = (state: any) => state.info.start;
export const selectEnd = (state: any) => state.info.end;
export const selectCurrentAction = (state: any) => state.info.currentAction;
export const selectRows = (state: any) => state.info.rows;
export const selectCols = (state: any) => state.info.cols;
export const selectSpeed = (state: any) => state.info.speed;
export const selectIsRunning = (state: any) => state.info.isRunning;
export const selectIsFinished = (state: any) => state.info.isFinished;
export const selectIsPaused = (state: any) => state.info.isPaused;

export default infoSlice.reducer;
