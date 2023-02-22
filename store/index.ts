import {configureStore,AnyAction} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import sliceApiLoadState from './../reducers/apistate'

///////////////////////
//combine reducer, you can use multiple function too.. but this way is ease.
// import { combineReducers } from 'redux'

// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'

// const rootReducer = combineReducers({
//   // Define a top-level state field named `todos`, handled by `todosReducer`
//   todos: todosReducer,
//   filters: filtersReducer
// })

// export default rootReducer

////////////////
// persitência usign localStorage or can be used with server call too

// let preloadedState
// const persistedTodosString = localStorage.getItem('todos')

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

// const store = createStore(rootReducer, preloadedState)
//////////////////

const store = configureStore({
    reducer:{
        sliceApiLoadState,
        rootReducer
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store



///////////////// Middleware
// import { client } from '../api/client'

// const delayedActionMiddleware = storeAPI => next => action => {
//   if (action.type === 'todos/todoAdded') {
//     setTimeout(() => {
//       // Delay this action by one second
//       next(action)
//     }, 1000)
//     return
//   }

//   return next(action)
// }

// const fetchTodosMiddleware = storeAPI => next => action => {
//   if (action.type === 'todos/fetchTodos') {
//     // Make an API call to fetch todos from the server
//     client.get('todos').then(todos => {
//       // Dispatch an action with the todos we received
//       storeAPI.dispatch({ type: 'todos/todosLoaded', payload: todos })
//     })
//   }

//   return next(action)
// }
///////////////////////////////////////////////
///another calling function
// const asyncFunctionMiddleware = storeAPI => next => action => {
//     // If the "action" is actually a function instead...
//     if (typeof action === 'function') {
//       // then call the function and pass `dispatch` and `getState` as arguments
//       return action(storeAPI.dispatch, storeAPI.getState)
//     }
  
//     // Otherwise, it's a normal action - send it onwards
//     return next(action)
//   }

//continuing now using it
// const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
// const store = createStore(rootReducer, middlewareEnhancer)

// // Write a function that has `dispatch` and `getState` as arguments
// const fetchSomeData = (dispatch, getState) => {
//   // Make an async HTTP request
//   client.get('todos').then(todos => {
//     // Dispatch an action with the todos we received
//     dispatch({ type: 'todos/todosLoaded', payload: todos })
//     // Check the updated store state after dispatching
//     const allTodos = getState().todos
//     console.log('Number of todos after loading: ', allTodos.length)
//   })
// }

// // Pass the _function_ we wrote to `dispatch`
// store.dispatch(fetchSomeData)
// // logs: 'Number of todos after loading: ###'

///another way is using the oficial  Redux "Thunk" middleware.