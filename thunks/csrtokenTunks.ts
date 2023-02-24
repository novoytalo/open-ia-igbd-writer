import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchApi = async (props: any) => {
    const reponse = await axios({
        method: "post",
        url: "./api/csrftokengenerator",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props}`,
        },
    });
    return reponse.data;
};

export const thunkCsrfToken = createAsyncThunk(
    "thunkCsrfToken",
    async (props: any) => {
        console.log('Passou Um!')
        const response = fetchApi(props);
        return response;
    }
);
