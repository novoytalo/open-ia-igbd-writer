import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
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



// const fetchApi = async ({csrfToken, propstoken,textToApi,rejectWithValue,signal }: any) => {
//     const source = axios.CancelToken.source()
    
//     try {
//         const response = await axios({
//             method: "post",
//             url: "./api/openAi",
//             data: { textToApi: textToApi },
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-CSRF-Token": csrfToken,
//                 Authorization: `Bearer ${propstoken}`,
//             },
//             signal: controller.signal
//         })
           
//         return response.data.result
//     } catch (error:any) {
//         if(axios.isCancel(error)){
//             console.log('Request canceled', error.message)
//         } else{
//             return rejectWithValue(error.response.data)
        
//         }
        
//     } finally {
//         source.cancel('Component List was disassembled')
//     }
    

// };

export const thunkApiOpenAI = createAsyncThunk(
    "thunkApiOpenAI",
    async ({csrfToken, propstoken, textToApi}:any,{getState, dispatch, rejectWithValue, signal}) => {
        
        const state = getState() as RootState;
        // console.log('state from Tunk test:>',state.sliceOpenAI.dataList)
    
        try {
            const response = await axios({
                method: "post",
                url: "./api/openAi",
                data: { textToApi: textToApi },
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                    Authorization: `Bearer ${propstoken}`,
                },
                signal:signal
            })
               
            return response.data.result
        } catch (error:any) {
          
                console.log('Request canceled', error.message)
           
                return rejectWithValue(error.response.data)
            
            }
            
      


    }
);

