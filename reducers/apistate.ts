import { createSlice } from "@reduxjs/toolkit";
import { thunkCsrfToken } from "./../thunks/csrtokenTunks";

interface initialStateTypes {
    // data: null | string;
    data: null|string;
    isLoading: boolean;
    error: any;
}

const initialState:initialStateTypes = {
    data: null,
    isLoading: false,
    error: null,
};

const sliceApiLoadState = createSlice({
    name: "sliceApiLoadState",
    initialState,
    reducers: {
        // setLoading: (state) => {
        //     (state.isLoading = true), (state.error = null);
        // },
        // setData: (state, action) => {
        //     state.isLoading = false;
        //     state.data = action.payload;
        // },
        // setError: (state, action) => {
        //     (state.isLoading = false), (state.error = action.payload);
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(thunkCsrfToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(thunkCsrfToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(thunkCsrfToken.rejected, (state, action) => {
                (state.isLoading = false), (state.error = action.payload);
            });
    },
});

export default sliceApiLoadState.reducer;
