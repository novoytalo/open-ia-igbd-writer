import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// const fetchApi = async (props: any) => {
//     const reponse = await axios({
//         method: "post",
//         url: "./api/csrftokengenerator",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${props}`,
//         },
//     });
//     return reponse.data;
// };

export const thunkCsrfToken = createAsyncThunk(
    "thunkCsrfToken",
    async (props: any, {rejectWithValue, getState, signal}) => {
        console.log('Passou Um!')
        // const response = fetchApi(props);
        const state = getState() as RootState;
        // const controller = new AbortController()
        
        // return response;
        try {
            const reponse = await axios({
                method: "post",
                url: "./api/csrftokengenerator",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props}`,
                },
                signal: signal,
            });
            return reponse.data;
        } catch (error:any) {
            console.log('Request canceled', error.message)
           
            return rejectWithValue(error.response.data)
        }
    }
);
