import React, {useEffect, useState} from "react"
import {deleteTodoTC, editCompletedTodoTC, editTitleTodoTC, getTodoTC} from "../../utils/reducer"
import {useDispatch, useSelector} from "react-redux"
import SuperEditableSpan from "../../utils/SuperEditableSpan"
import SuperSelect from "../../utils/SuperSelect"
import AddNewTodoForm from "./AddNewTodoForm"


export default function Todos() {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.todos)
    const error = useSelector(state => state.todos.error)
    const [currentPage, setCurrentPage] = useState(1)

    let array = []
    let countPages = 0
    let pages = []
    let newId = 0
    if (Array.isArray(todos)) {
        array = todos.filter((t, i) => i < currentPage * 10 && i >= (currentPage * 10 - 10))
        if (todos.length > 0) {
            newId = todos[todos.length - 1].id + 1
        }
        countPages = Math.ceil(todos.length / 10)
        let start = 1
        let finish = 5
        if (currentPage > start + 2) {
            start = currentPage - 3
            if (currentPage < countPages - 3) {
                finish = currentPage + 3
            } else {
                finish = countPages
            }
        }
        for (let i = start; i <= finish; i++) {
            pages.push(i)
        }
    }

    useEffect(() => {
        dispatch(getTodoTC())
    }, [])

    const editTitleTodo = (e, id) => {
        dispatch(editTitleTodoTC(e, id))
    }
    const editCompletedTodo = (e, id) => {

        dispatch(editCompletedTodoTC(e === 'yes', id))
    }
    const deleteTodo = (id) => {
        dispatch(deleteTodoTC(id))
    }

    if (error) {
        console.error(error)
        return (<div>
            Server error, try again later
        </div>)
    }
    return (
        <div>
            <AddNewTodoForm newId={newId}/>
            <table>
                <tbody>
                <tr>
                    <th>userId</th>
                    <th>id</th>
                    <th>title</th>
                    <th>completed</th>
                </tr>

                {array && array.map((t, i) => {
                    return (
                        <tr key={i}>
                            <td>{t.userId}</td>
                            <td>{t.id}</td>
                            <td>
                                <SuperEditableSpan
                                    value={t.title}
                                    onChangeText={(e) => editTitleTodo(e, t.id)}

                                />


                            </td>
                            <td>
                                <SuperSelect options={[" ", "yes", "no"]}
                                             onChangeOption={(e) => editCompletedTodo(e, t.id)}/>
                                {t.completed ? "yes" : "no"}
                            </td>
                            <td>

                                <button onClick={() => {
                                    deleteTodo(t.id)
                                }}>delete
                                </button>
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
            <div>
                {pages.map(t => <span key={t} onClick={() => setCurrentPage(t)}>
                        <button className={currentPage === t
                            ? "button_active"
                            : "button"}
                        >{t}</button>
                    </span>)}
            </div>
        </div>
    )
}