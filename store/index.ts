import {configureStore,AnyAction} from '@reduxjs/toolkit';


interface ExampleState{
    exampleData?: string;
}

const initialState: ExampleState ={};

function rootReducer (state: ExampleState=initialState,action:AnyAction){
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

const store = configureStore({
    reducer:rootReducer,
})

export default store