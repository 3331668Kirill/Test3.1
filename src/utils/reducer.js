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
            stateCopy.todos[index].completed = action.completed
            return stateCopy
        }
        case 'DELETE_TODO':{
            const index = state.todos.findIndex(t=>t.id === action.id)
            let stateCopy = {...state, todos: [...state.todos.map(t=>t)]}
            if (index > -1) {
                stateCopy.todos.splice(index, 1);
            }
            return stateCopy
        }
        case 'ADD_NEW_TODO':{
            let stateCopy = {...state, todos: [...state.todos.map(t=>t)]}
            stateCopy.todos.push(action.data)
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
export const DeleteTodosAC = (id) => {
    return ({type: 'DELETE_TODO',  id})
}
export const addNewTodosAC = (data) => {
    return ({type: 'ADD_NEW_TODO',  data})
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
export const deleteTodoTC = (id) => (dispatch) => {
    dispatch(DeleteTodosAC(id))
    postsAPI.deleteTodos(id)
        .then(res=>console.log(res))
        .catch((err) => {
            console.log(err)
            dispatch(ErrorAC(err))
        })
}
export const addNewTodoTC = (userId, id, title) => (dispatch) => {
    let newTodo = {userId, id, title, completed:false}
    dispatch(addNewTodosAC(newTodo))
    postsAPI.addTodos(JSON.stringify(newTodo))
        .then(res => console.log(res))
        .catch((err) => {
            console.log(err)
            dispatch(ErrorAC(err))
        })
}