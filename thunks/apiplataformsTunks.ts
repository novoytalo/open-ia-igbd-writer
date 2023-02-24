import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchApi = async ({csrfToken, propstoken }: any) => {
    // console.log('inside csrfToken:',csrfToken,'inside propstoken2:', propstoken)
     const reponse= await axios({
        method: "post",
        url: "./api/igbd_big_query_platforms",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
            // I have to add cookie in the GET
            // Cookie: cookies.cookies,
            // Authorization: `Bearer ${passCookie}`,
            // Authorization: `Bearer ${passCookie}`,
            Authorization: `Bearer ${propstoken}`,
        },
    })
    
    return reponse.data;
};

export const thunkApiPlataforms = createAsyncThunk(
    "thunkApiPlataforms",
    async ({csrfToken, propstoken}:any) => {
        console.log('Passou Dois!')
        const response = fetchApi({csrfToken, propstoken});
        return response;
    }
);
