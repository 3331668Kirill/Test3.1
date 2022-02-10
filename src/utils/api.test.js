import axios from 'axios'
import {instance, postsAPI} from "./api";

jest.mock('axios', () => {
    return {
        create: () => {
            return {
                get: jest.fn(),
                post: jest.fn(),
                delete: jest.fn()
            }
        }
    };
});

test('should fetch todos', () => {
    const resp = {
        userId: 1,
        id: 1,
        title: 'test title',
        completed: false
    }

    instance.get.mockResolvedValue(resp)

    return postsAPI.getTodos().then(todos => expect(todos).toEqual(resp))

});

test('should add new todo', () => {
    const newTodo = {
        userId: 101,
        id: 101,
        title: 'new title',
        completed: false
    }

    instance.post.mockResolvedValue(newTodo)

    return postsAPI.addTodos(JSON.stringify(newTodo)).then(posts => expect(posts).toEqual(newTodo))

});

test('should delete todo', () => {
    const todoId = 2

    instance.delete.mockResolvedValue({})

    return postsAPI.deleteTodos(todoId).then(posts => expect(posts).toEqual({}))

});