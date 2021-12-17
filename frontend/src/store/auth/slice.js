import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    token: null,
    user: null,
    errors: null,
    inProgress: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: defaultState,
    reducers: {},
    extraReducers: {}
});

export default authSlice.reducer;
