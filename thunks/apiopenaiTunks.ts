import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// interface StateFrom {
//     slicePlataForms:{};
//     sliceApiLoadState:{};
//     sliceOpenAI:{
//         data:string;
//         dataList:string[];
//         isLoading:boolean;
//         error:any
//     }

// }



const fetchApi = async ({csrfToken, propstoken,textToApi }: any) => {

    const response = await axios({
        method: "post",
        url: "./api/openAi",
        data: { textToApi: textToApi },
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
            Authorization: `Bearer ${propstoken}`,
        },
    })
       
    return response.data.result

};

export const thunkApiOpenAI = createAsyncThunk(
    "thunkApiOpenAI",
    async ({csrfToken, propstoken, textToApi}:any,{getState}) => {
        const state = getState() as RootState;
        
        console.log('state from Tunk test:>',state.sliceOpenAI.dataList)
        const response = fetchApi({csrfToken, propstoken,textToApi});
        
        return response;
    }
);

