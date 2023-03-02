import { createSlice } from "@reduxjs/toolkit";
import { thunkCsrfToken } from "./../thunks/csrtokenTunks";

interface initialStateTypes {
    // data: null | string;
    data: null|string;
    isLoading: boolean;
    error: any;
    // abortController:any;
}

const initialState:initialStateTypes = {
    data: null,
    isLoading: false,
    error: null,
    // abortController:null,

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
        // aborFetch:(state)=>{
        //     if(state.abortController){
        //         state.abortController.abort();
        //         state.abortController=null;
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(thunkCsrfToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                // state.abortController=new AbortController()
            })
            .addCase(thunkCsrfToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                // state.abortController=null;
            })
            .addCase(thunkCsrfToken.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = action.error.message;
                // state.abortController=null
            });
    },
});

export default sliceApiLoadState.reducer;
