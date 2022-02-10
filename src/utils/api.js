import axios from 'axios'

export const instance = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
)

export const postsAPI = {
    getTodos() {
        return instance.get('todos')
    },
    addTodos(todos) {
        return instance.post('todos', todos)
    },
    deleteTodos(id) {
        return instance.delete(`todos/${id}`)
    }
}

