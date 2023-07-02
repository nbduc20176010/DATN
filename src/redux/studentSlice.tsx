import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import { notification } from "antd";

type iInit = {
  schedule: any[];
  profile: any;
  loading: boolean;
};

export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async ({ token }: any) => {
    const res = await api.get("/student/profile", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const createRequest = createAsyncThunk(
  "student/createRequest",
  async ({ values, token }: any) => {
    const res = await api.post("/student/request", values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchStudentSchedule = createAsyncThunk(
  "student/fetchSchedule",
  async ({ token }: any) => {
    const res = await api.get("/student/schedule", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const studentSlice = createSlice({
  name: "schedules",
  initialState: {
    schedule: [],
    profile: {},
    loading: false,
  } as iInit,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudentSchedule.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStudentSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchStudentSchedule.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchStudentProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStudentProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchStudentProfile.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createRequest.fulfilled, (state, action) => {
      notification.success({
        description: `${action.payload.message}`,
        message: "Create request successful!",
        duration: 2,
      });
    });
  },
});

export default studentSlice.reducer;
