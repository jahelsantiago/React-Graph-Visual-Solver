import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { boardReducer, infoReducer } from "../features"
import {updateBlockMiddleware} from "./middlewares"

export const store = configureStore({
  reducer: {
    info: infoReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(updateBlockMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
