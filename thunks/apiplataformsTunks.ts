import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchApi = async ({csrfToken, propstoken,signal }: any) => {
     const reponse= await axios({
        method: "post",
        url: "./api/igbd_big_query_platforms",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
            Authorization: `Bearer ${propstoken}`,
        },
        signal: signal,
    })
    
    return reponse.data[0].result;
};

export const thunkApiPlataforms = createAsyncThunk(
    "thunkApiPlataforms",
    async ({csrfToken, propstoken}:any,{signal}) => {
        console.log('Passou Dois!')
        const response = fetchApi({csrfToken, propstoken,signal});
        return response;
    }
);
