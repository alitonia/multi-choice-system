import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: undefined,
        user: undefined,
        errors: undefined,
        inProgress: false
    },
    reducers: {},
    extraReducers: {}
});

export default authSlice.reducer;
