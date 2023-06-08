import { iSchedule } from "./../dtos/pageDto";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

interface iInit {
    loading: boolean;
    formOpen: boolean;
    schedules?: iSchedule[];
    rooms?: any[];
}

export const fetchSchedules = createAsyncThunk("fetchSchedule", async () => {
    const res = await api.get("/schedule");
    return res.data;
});

export const getRooms = createAsyncThunk("schedule/getRooms", async () => {
    const res = await api.get("/room");
    return res.data;
});

const scheduleSlice = createSlice({
    name: "schedules",
    initialState: {
        loading: true,
        formOpen: false,
    } as iInit,
    reducers: {
        triggerForm: (state) => {
            state.formOpen = !state.formOpen;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSchedules.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSchedules.fulfilled, (state, action) => {
            state.loading = false;
            state.schedules = action.payload;
        });
        builder.addCase(fetchSchedules.rejected, (state, Action) => {
            state.loading = false;
        });
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
        });
    },
});

export const { triggerForm } = scheduleSlice.actions;
export default scheduleSlice.reducer;
