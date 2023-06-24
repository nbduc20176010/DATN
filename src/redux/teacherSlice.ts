import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import { iClass } from "../dtos/pageDto";
import { notification } from "antd";

interface iInit {
  datas: any;
  schedule: any[];
  classDetail: iClass;
  profile: any;
}

export const fetchClasses = createAsyncThunk(
  "teacher/fetchClasses",
  async (token: string) => {
    const res = await api.get(`/teacher/classes`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchClassDetail = createAsyncThunk(
  "teacher/fetchClassById",
  async (id: string) => {
    const res = await api.get(`/class/${id}`);
    return res.data;
  }
);

export const updateClassDetail = createAsyncThunk(
  "teacher/editClass",
  async ({ id, token, values }: any) => {
    const res = await api.put(`/teacher/class/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchTeacherSchedule = createAsyncThunk(
  "teacher/fetchTeacherSchedule",
  async (token: string) => {
    const res = await api.get(`/teacher/schedule`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const getProfile = createAsyncThunk(
  "teacher/profile",
  async (token: string) => {
    const res = await api.get("/teacher/profile", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const createRequest = createAsyncThunk(
  "teacher/createRequest",
  async ({ values, token }: any) => {
    const res = await api.post("/teacher/request", values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const teacherSlice = createSlice({
  name: "schedules",
  initialState: {
    datas: [],
    classDetail: {
      className: "",
      room: "",
      numberOfStudents: 0,
      maxStudents: 0,
      schedule: [],
      students: [],
      notes: "",
    },
    profile: {},
    schedule: [],
  } as iInit,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.datas = action.payload;
    });
    builder.addCase(fetchClassDetail.fulfilled, (state, action) => {
      state.classDetail = action.payload;
    });
    builder.addCase(updateClassDetail.fulfilled, (state, action) => {
      state.classDetail = action.payload;
    });
    builder.addCase(fetchTeacherSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
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

export default teacherSlice.reducer;
