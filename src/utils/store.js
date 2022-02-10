import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer} from "./reducer";

const rootReducer = combineReducers({
    todos: reducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));



