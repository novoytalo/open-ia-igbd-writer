import {configureStore,AnyAction} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import sliceApiLoadState from './../reducers/apistate'
import slicePlataForms from './../reducers/apiplataforms'


const store = configureStore({
    reducer:{
        slicePlataForms,
        sliceApiLoadState,
        rootReducer,
        
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store

