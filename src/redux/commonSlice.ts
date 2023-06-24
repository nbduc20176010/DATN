import { iSignin } from "../dtos/formDto";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

interface iInitState {
  loading: "idle" | "loading" | "success" | "fail";
  formType?: string;
  classFormOpen: boolean;
  teacherFormOpen: boolean;
  studentFormOpen: boolean;
  profile: any;
}

const initialState: iInitState = {
  loading: "idle",
  classFormOpen: false,
  studentFormOpen: false,
  teacherFormOpen: false,
  profile: {},
};

export const signIn = createAsyncThunk("signin", async (input: iSignin) => {
  const res = await api.post("/login", input);
  return res.data;
});

export const signOut = createAsyncThunk("signout", async (token: string) => {
  const res = await api.post("/logout", null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const getProfile = createAsyncThunk(
  "common/profile",
  async ({ type, token }: any) => {
    const res = await api.get(`/profile/${type}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const CommonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    resetLoading: (state) => {
      state.loading = "idle";
    },
    triggerClassForm: (state) => {
      state.classFormOpen = !state.classFormOpen;
    },
    triggerStudentForm: (state) => {
      state.studentFormOpen = !state.studentFormOpen;
    },
    triggerTeacherForm: (state) => {
      state.teacherFormOpen = !state.teacherFormOpen;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state, _) => {
      state.loading = "loading";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { username, role, accessToken } = action.payload;
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("token", accessToken);
      state.loading = "success";
    });
    builder.addCase(signIn.rejected, (state, _) => {
      state.loading = "fail";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      localStorage.clear();
    });
  },
});

export const {
  resetLoading,
  triggerClassForm,
  triggerStudentForm,
  triggerTeacherForm,
  setFormType,
} = CommonSlice.actions;
export default CommonSlice.reducer;
