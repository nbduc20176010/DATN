import { iSchedule } from "./../dtos/pageDto";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import { notification } from "antd";

interface iInit {
  loading: boolean;
  formOpen: boolean;
  schedules?: iSchedule[];
  rooms?: any[];
  teacher?: any[];
}

export const fetchSchedules = createAsyncThunk("fetchSchedule", async () => {
  const res = await api.get("/schedule");
  return res.data;
});

export const getRooms = createAsyncThunk("schedule/getRooms", async () => {
  const res = await api.get("/room");
  return res.data;
});

export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async ({ values, token }: any) => {
    const res = await api
      .put("schedule/", values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((success) => success)
      .catch((error) => error.response);
    return res.data;
  }
);

export const getTeachers = createAsyncThunk(
  "schedule/fetchTeachers",
  async (token: any) => {
    const res = await api.get("/admin/teacher", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const deleteClassInSchedule = createAsyncThunk(
  "schedule/deleteClass",
  async ({ id, values, token }: any) => {
    const res = await api.post(`/schedule/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

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
    builder.addCase(addSchedule.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addSchedule.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.loading = false;
        notification.error({
          message: "Somethings wrong!",
          description: `${action.payload.message}`,
          duration: 2,
        });
      } else {
        const newSchedules = state.schedules?.map((item) =>
          item.label === action.payload.label ? action.payload : item
        );
        state.schedules = newSchedules;
        state.loading = false;
      }
    });
    builder.addCase(addSchedule.rejected, (state, action) => {
      state.loading = false;
      notification.error({
        message: "Somethings wrong!",
        description: "somethings wrong!",
        duration: 2,
      });
    });
    builder.addCase(getTeachers.fulfilled, (state, action) => {
      state.teacher = action.payload;
    });
    builder.addCase(deleteClassInSchedule.fulfilled, (state, action) => {
      const newSchedules = state.schedules?.map((item) =>
        item.label === action.payload.label ? action.payload : item
      );
      state.schedules = newSchedules;
    });
  },
});

export const { triggerForm } = scheduleSlice.actions;
export default scheduleSlice.reducer;
