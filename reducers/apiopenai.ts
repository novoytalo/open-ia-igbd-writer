import { createSlice } from "@reduxjs/toolkit";
import { thunkApiOpenAI } from "./../thunks/apiopenaiTunks";

interface initialStateTypes {
    data:  string;
    dataList:string[];
    isLoading: boolean;
    error: any;
    // abortController:any;
}

const initialState:initialStateTypes = {
    data: '',
    dataList:[],
    isLoading: false,
    error: null,
    // abortController:null,
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
        // aborFetch:(state)=>{
        //     if(state.abortController){
        //         state.abortController.abort();
        //         state.abortController=null;
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(thunkApiOpenAI.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                // state.abortController= new AbortController();
                
            })
            .addCase(thunkApiOpenAI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.dataList.push(action.payload);
                // state.abortController=null;
            })
            .addCase(thunkApiOpenAI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                // state.abortController=null;
                
            });
           
    },
});

export default sliceOpenAI.reducer;