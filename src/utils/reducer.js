import {postsAPI} from "./api";


const initialState = {
    todos: [],
    error: ''
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS': {
            return {...state, todos: action.data}
        }
        case 'EDIT_TITLE_TODOS':{
            const index = state.todos.findIndex(t=>t.id === action.id)
            let stateCopy = {...state, todos: [...state.todos.map(t=>t)]}
            stateCopy.todos[index].title = action.title
            return stateCopy
        }
        case 'EDIT_COMPLETE_TODOS':{
            const index = state.todos.findIndex(t=>t.id === action.id)
            let stateCopy = {...state, todos: [...state.todos.map(t=>t)]}
            console.log(action.completed)
            stateCopy.todos[index].completed = action.completed
            console.log(stateCopy.todos[index].completed)
            return stateCopy
        }


        case 'ERROR': {
            return {...state, error: action.data}
        }
        default:
            return state
    }
}

export const GetTodosAC = (data) => {
    return ({type: 'GET_TODOS', data})
}
export const EditTitleTodosAC = (title, id) => {
    return ({type: 'EDIT_TITLE_TODOS', title, id})
}
export const EditCompletedTodosAC = (completed, id) => {
    return ({type: 'EDIT_COMPLETE_TODOS', completed, id})
}

export const ErrorAC = (data) => {
    return ({type: 'ERROR', data})
}
export const getTodoTC = () => (dispatch) => {
    postsAPI.getTodos().then((res) => {
        dispatch(GetTodosAC(res.data))
    }).catch((err) => {
        console.log(err)
        dispatch(ErrorAC(err))
    })
}

export const editTitleTodoTC = (title, id) => (dispatch) => {
    dispatch(EditTitleTodosAC(title, id))
}
export const editCompletedTodoTC = (completed, id) => (dispatch) => {
    dispatch(EditCompletedTodosAC(completed, id))
}