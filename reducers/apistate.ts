import { createSlice } from "@reduxjs/toolkit";
import {thunkCsrfToken} from "./../thunks/csrtokenTunks"

const initialState = {
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
        builder.addCase(thunkCsrfToken.pending,(state)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(thunkCsrfToken.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data= action.payload;
        })
    },
});

// export const { setData, setError, setLoading } = slice.actions;

export default sliceApiLoadState.reducer;
