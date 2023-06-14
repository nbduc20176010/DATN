import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import { iClass } from "../dtos/pageDto";

interface iInit {
  datas: any;
  classDetail: iClass;
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
  } as iInit,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.datas = action.payload;
    });
  },
});

export default teacherSlice.reducer;
