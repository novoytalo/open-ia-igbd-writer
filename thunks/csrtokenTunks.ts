import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const fetchApi = async (props: any) => {
   const reponse = await axios({
        method: "post",
        url: "./api/csrftokengenerator",
        // data: { animal: animal },
        headers: {
            "Content-Type": "application/json",
            // I have to add cookie in the GET
            // Cookie: cookies.cookies,
            // Authorization: `Bearer ${passCookie}`,
            Authorization: `Bearer ${props}`,
        },
    });
    return reponse.data
    // .then((resposta) => {
    //     // setCsrfToken(resposta.data);]
    //     return resposta.data
    // })
    // .catch((error) => console.log(error));
};

export const thunkCsrfToken = createAsyncThunk("thunkCsrfToken", async (props:any) => {
    const response = fetchApi(props);
    return response;
});
