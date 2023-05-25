import { iSignin } from "@dtos/formDto";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";
import { notification } from "antd";
import { setCookie, deleteCookie } from "cookies-next";

interface iInitstate {
    loginLoading: "idle" | "loading" | "success";
    logoutLoading: "idle" | "loading" | "success";
}

export const signin = createAsyncThunk("signin", async (values: iSignin) => {
    const res = await api.post("/login", values);
    return res.data;
});

export const signup = createAsyncThunk("signup", async (values: iSignin) => {
    const res = await api.post("/signup", values);
    return res.data;
});

export const signout = createAsyncThunk("signout", async (token: string) => {
    const res = await api.post("/logout", null, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loginLoading: "idle",
        logoutLoading: "idle",
    } as iInitstate,
    reducers: {
        resetLoading: (state) => {
            state.loginLoading = "idle";
            state.logoutLoading = "idle";
        },
    },
    extraReducers(builder) {
        builder.addCase(signin.pending, (state, action) => {
            state.loginLoading = "loading";
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            const { username, role, accessToken }: any = action.payload;
            setCookie("user-token", accessToken);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);
            state.loginLoading = "success";
        });
        builder.addCase(signin.rejected, (state, action) => {
            state.loginLoading = "idle";
            notification.error({
                message: "Error",
            });
        });
        builder.addCase(signup.pending, (state, action) => {
            state.loginLoading = "loading";
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loginLoading = "success";
            notification.success({
                message: "Congratz!",
                description: "Sign up successful!",
                duration: 3,
            });
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loginLoading = "idle";
            notification.error({
                message: "Error",
            });
        });
        builder.addCase(signout.fulfilled, (state, action) => {
            deleteCookie("user-token");
            localStorage.clear();
            state.logoutLoading = "success";
            notification.success({
                message: "Goodbye!",
                description: "Cyah!",
                duration: 2,
            });
        });
    },
});

export const { resetLoading } = userSlice.actions;
export default userSlice.reducer;
