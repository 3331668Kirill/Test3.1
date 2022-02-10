import './App.css'
import React from 'react'
import Footer from "./components/footer/footer";

import {HashRouter, NavLink} from "react-router-dom";
import RoutesMain from "./routing/Routing";

function App() {


  return (<>
  <div className="App">
      <HashRouter>

          <div className="navbar">
              <NavLink to={'/'}> Home </NavLink>
              <NavLink to={'/todos'}> Todos </NavLink>

          </div>
          <div className="App-header">
          <RoutesMain/>
          </div>
      </HashRouter>
  </div>
          <Footer>
            Test task was made by Mitko Kirill {new Date().getFullYear()}.
            <br/>
            3331668@mail.ru
          </Footer>

      </>
  );
}

export default App;