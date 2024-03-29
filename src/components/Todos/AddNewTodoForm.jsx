import React, {useState} from 'react'
import {Modal} from "./Modal";
import {useDispatch} from "react-redux";
import {addNewTodoTC} from "../../utils/reducer";

export default function AddNewTodoForm({newId}) {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const [userId, setUserId] = useState('')
    const [title, setTitle] = useState('')
    const addNewTodo = (userId, id, title) =>{
        setModalActive(false)
        dispatch(addNewTodoTC(userId, id, title))
        setUserId('')
        setTitle('')
    }
    return (
        <div className="div_button_new_todo">
            <button className="button" onClick={()=>{setModalActive(true)}}>add new todos</button>
            <Modal active={modalActive} setActive={setModalActive}>
                <div>
                    <label>Enter userId: </label>
                    <input type={"text"} value={userId}
                           onChange={(e)=>setUserId(e.currentTarget.value)}
                           />
                </div>
                <div>
                    <label>Enter title:</label>
                    <input type={"text"} value={title}
                            onChange={(e)=>setTitle(e.currentTarget.value)}
                           maxLength={20}/>
                </div>
                <button className="button" onClick={()=>{
                    addNewTodo(userId,newId,title)
                    }}>save</button>

            </Modal>
        </div>
    )
}
