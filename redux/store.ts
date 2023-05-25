import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminReducer from "./adminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
