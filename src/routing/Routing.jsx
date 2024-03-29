import React from 'react'
import Main from "../components/main/main";
import {Route, Routes} from "react-router-dom";
import Todos from "../components/Todos/Todos";

export const PATH = {
    TODOS: 'todos',
    HOME: '/'
}

function RoutesMain() {
    return (
        <div>
            <Routes>
                <Route path={PATH.HOME} element={<Main/>}/>
                <Route path={PATH.TODOS} element={<Todos/>}/>
            </Routes>
        </div>
    )
}

export default RoutesMain
