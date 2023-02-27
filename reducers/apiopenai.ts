import { createSlice } from "@reduxjs/toolkit";
import { thunkApiOpenAI } from "./../thunks/apiopenaiTunks";

interface initialStateTypes {
    data: null | string;
    dataList:string[];
    isLoading: boolean;
    error: any;
}

const initialState:initialStateTypes = {
    data: null,
    dataList:[],
    isLoading: false,
    error: null,

};


const sliceOpenAI = createSlice({
    name: "sliceOpenAI",
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
            .addCase(thunkApiOpenAI.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                
            })
            .addCase(thunkApiOpenAI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.dataList.push(action.payload);
            })
            .addCase(thunkApiOpenAI.rejected, (state, action) => {
                (state.isLoading = false), (state.error = action.payload);
            });
    },
});

export default sliceOpenAI.reducer;