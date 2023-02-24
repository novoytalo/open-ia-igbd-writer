import { createSlice } from "@reduxjs/toolkit";
import { thunkApiPlataforms } from "./../thunks/apiplataformsTunks";

interface initialStateTypes {
    data: null | string;
    isLoading: boolean;
    error: any;
}

const initialState:initialStateTypes = {
    data: null,
    isLoading: false,
    error: null,
};


const slicePlataForms = createSlice({
    name: "slicePlataForms",
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
            .addCase(thunkApiPlataforms.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(thunkApiPlataforms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(thunkApiPlataforms.rejected, (state, action) => {
                (state.isLoading = false), (state.error = action.payload);
            });
    },
});

export default slicePlataForms.reducer;