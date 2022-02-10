import React, {useEffect, useState} from "react";
import {editCompletedTodoTC, editTitleTodoTC, getTodoTC} from "../../utils/reducer";
import {useDispatch, useSelector} from "react-redux";
import SuperEditableSpan from "../../utils/SuperEditableSpan";
import SuperSelect from "../../utils/SuperSelect";


export default function Todos() {

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos)
    const error = useSelector(state => state.todos.error)
    const [currentPage, setCurrentPage] = useState(1)
    console.dir(todos)
    let array = []
    let countPages = 0
    let pages = []
    if (Array.isArray(todos)) {
        array = todos.filter((t, i) => i < currentPage * 10 && i >= (currentPage * 10 - 10))
        countPages = todos.length / 10
        for (let i = 1; i <= countPages; i++) {
            pages.push(i)
        }
    }

    useEffect(() => {
        dispatch(getTodoTC())
    }, [])

    const editTitleTodo = (e, id) =>{
        dispatch(editTitleTodoTC(e,id))
    }
    const editCompletedTodo = (e, id) =>{
        console.log(e)
        dispatch(editCompletedTodoTC(e === 'yes',id))
    }


    if (error) {
        console.error(error)
        return (<div>
            Server error, try again later
        </div>)
    }
    return (
        <div>
           <table>
                <tbody>
                <tr>
                    <th>UserId</th>
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
                                    onChangeText={(e)=>editTitleTodo(e,t.id)}

                                />


                            </td>
                            <td>
                                <SuperSelect options={[" ","yes","no"]} onChangeOption={(e)=>editCompletedTodo(e,t.id)}/>
                                {t.completed === true ? "yes" : "no"}
                            </td>
                            <td>

                                <button>delete</button>
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
            <div>
                {pages.map(t => <span key={t} onClick={() =>
                    setCurrentPage(t)}>
                        <button className={currentPage === t
                            ? "button_active"
                            : "button"}
                        >{t}</button>
                    </span>)}
            </div>
        </div>
    )
}