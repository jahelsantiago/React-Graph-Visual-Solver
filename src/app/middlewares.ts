import {RootState, AppDispatch} from "./store";

type Middleware = (store: any) => (next: any) => (action: any) => void;

export const updateBlockMiddleware:Middleware = store => next => action => {
    console.log("updateBlockMiddleware");
    console.log(action);
    next(action);
}