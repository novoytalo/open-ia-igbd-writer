import { createSlice } from "@reduxjs/toolkit";
import { thunkApiPlataforms } from "./../thunks/apiplataformsTunks";

interface initialStateTypes {
    data: any[];
    isLoading: boolean;
    error: any;
    // abortController:any;
}

const initialState:initialStateTypes = {
    data: [],
    isLoading: false,
    error: null,
    // abortController:null,
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
        // aborFetch:(state)=>{
        //     if(state.abortController){
        //         state.abortController.abort();
        //         state.abortController=null;
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(thunkApiPlataforms.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                // state.abortController= new AbortController()
            })
            .addCase(thunkApiPlataforms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                // state.abortController=null;
            })
            .addCase(thunkApiPlataforms.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                // state.abortController=null;
            });
    },
});

export default slicePlataForms.reducer;