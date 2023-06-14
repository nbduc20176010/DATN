import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CommonReducer from "./commonSlice";
import AdminReducer from "./adminSlice";
import ScheduleReducer from "./scheduleSlice";
import TeacherReducer from "./teacherSlice";

export const store = configureStore({
  reducer: {
    common: CommonReducer,
    admin: AdminReducer,
    schedule: ScheduleReducer,
    teacher: TeacherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
