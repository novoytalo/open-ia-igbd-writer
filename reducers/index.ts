import { AnyAction } from "redux";

interface ExampleState{
    exampleData?: string;
}

const initialState: ExampleState ={};

export default function rootReducer (state: ExampleState=initialState,action:AnyAction){
    switch(action.type){
        case 'EXEMPLE_ACTION':
            return{
                ...state,
                exampleData:action.payload,
            }
            default:
                return state;       
    }

}