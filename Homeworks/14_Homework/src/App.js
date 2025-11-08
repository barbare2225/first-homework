import React, { Component } from "react"
import './App.css'
import FuncTodo from "./components/FuncTodo.jsx"

class App extends Component {
  render(){
    return (
        <div className="todo-container">
          <h1> To-Do List</h1>
      <FuncTodo />
      </div>
    )
  }
}


export default App;