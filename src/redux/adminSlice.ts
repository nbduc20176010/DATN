import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { iClass } from "../dtos/pageDto";
import api from "../services/api";

interface iInitstate {
  datas: any[];
  requests: any[];
  classDetail: iClass;
}

const initialState: iInitstate = {
  datas: [],
  requests: [],
  classDetail: {
    className: "",
    room: "",
    numberOfStudents: 0,
    maxStudents: 0,
    schedule: [],
    students: [],
    notes: "",
  },
};

export const fetchDatas = createAsyncThunk(
  "admin/fetchDatas",
  async ({ key, token }: any) => {
    const res = await api.get(`/admin/${key}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const addTeacher = createAsyncThunk(
  "admin/addTeacher",
  async ({ values, token }: any) => {
    const res = await api.post("/admin/teacher", values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const editTeacher = createAsyncThunk(
  "admin/editTeacher",
  async ({ _id, values, token }: any) => {
    const res = await api.put(`/admin/teacher/${_id}`, values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const deleteTeacher = createAsyncThunk(
  "admin/deleteTeacher",
  async ({ _id, token }: any) => {
    const res = await api.delete(`/admin/teacher/${_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const addStudent = createAsyncThunk(
  "admin/addStudent",
  async ({ values, token }: any) => {
    const res = await api.post("/admin/student", values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const editStudent = createAsyncThunk(
  "admin/editStudent",
  async ({ _id, values, token }: any) => {
    const res = await api.put(`/admin/student/${_id}`, values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "admin/deleteStudent",
  async ({ _id, token }: any) => {
    const res = await api.delete(`/admin/student/${_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const getClassById = createAsyncThunk(
  "admin/getClassById",
  async (id: string) => {
    const res = await api.get(`/class/${id}`);
    return res.data;
  }
);

export const addClass = createAsyncThunk(
  "admin/addClass",
  async ({ values, token }: any) => {
    const res = await api.post("/admin/class", values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const editClass = createAsyncThunk(
  "admin/editClass",
  async ({ id, values, token }: any) => {
    const res = await api.put(`/admin/class/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const deleteClass = createAsyncThunk(
  "admin/deleteClass",
  async ({ _id, token }: any) => {
    const res = await api.delete(`/admin/Class/${_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const approveRequest = createAsyncThunk(
  "admin/approveRequest",
  async ({ request, token }: any) => {
    const { category, ...rest } = request;
    const res = await api.put(
      `/admin/approval/${request.category}/${request._id}`,
      rest.body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchRequests = createAsyncThunk(
  "admin/fetchRequests",
  async ({ token, status }: { token: string; status?: string }) => {
    const res = await api.get(`/admin/requests/${status}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const declineRequest = createAsyncThunk(
  "admin/declineRequest",
  async ({ id, token }: any) => {
    const res = await api.put(`/admin/decline/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDatas.fulfilled, (state, action) => {
      state.datas = action.payload;
    });

    //teacher case
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.datas = [...state.datas, action.payload];
      notification.success({
        message: "Added success!",
        duration: 2,
      });
    });
    builder.addCase(editTeacher.fulfilled, (state, action) => {
      const newDatas = state.datas.map((item: any) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.datas = newDatas;
      notification.success({
        message: "Edited success!",
        duration: 2,
      });
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      const newDatas = state.datas.filter(
        (item: any) => item._id !== action.payload.id
      );
      state.datas = newDatas;
      notification.success({
        message: "Edited success!",
        duration: 2,
      });
    });

    //student case
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.datas = [...state.datas, action.payload];
      notification.success({
        message: "Added success!",
        duration: 2,
      });
    });
    builder.addCase(editStudent.fulfilled, (state, action) => {
      const newDatas = state.datas.map((item: any) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.datas = newDatas;
      notification.success({
        message: "Edited success!",
        duration: 2,
      });
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      const newDatas = state.datas.filter(
        (item: any) => item._id !== action.payload
      );
      state.datas = newDatas;
      notification.success({
        message: "Deleted success!",
        duration: 2,
      });
    });

    //class
    builder.addCase(getClassById.fulfilled, (state, action) => {
      state.classDetail = action.payload;
    });
    builder.addCase(addClass.fulfilled, (state, action) => {
      state.datas = [...state.datas, action.payload];
      notification.success({
        message: "Added success!",
        duration: 2,
      });
    });
    builder.addCase(editClass.fulfilled, (state, action) => {
      state.classDetail = action.payload;
    });
    builder.addCase(deleteClass.fulfilled, (state, action) => {
      const newDatas = state.datas.filter(
        (item: any) => item._id !== action.payload
      );
      state.datas = newDatas;
      notification.success({
        message: "Edited success!",
        duration: 2,
      });
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.requests = action.payload;
    });
    builder.addCase(approveRequest.fulfilled, (state, action) => {
      const newRequests = state.requests.map((item) =>
        item._id === action.payload.request._id ? action.payload.request : item
      );
      state.requests = newRequests;
      notification.success({
        message: `${action.payload.message}`,
        description: `${action.payload.message}`,
        duration: 2,
      });
    });
    builder.addCase(declineRequest.fulfilled, (state, action) => {
      const newRequests = state.requests.map((item) =>
        item._id === action.payload.request._id ? action.payload.request : item
      );
      state.requests = newRequests;
      notification.warning({
        message: `${action.payload.message}`,
        description: `${action.payload.message}`,
        duration: 2,
      });
    });
  },
});

export default adminSlice.reducer;
