import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

interface iInitstate {
    datas: any;
}

const initialState: iInitstate = {
    datas: [],
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

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchDatas.fulfilled, (state, action) => {
            state.datas = action.payload;
        });
    },
});

export default adminSlice.reducer;
