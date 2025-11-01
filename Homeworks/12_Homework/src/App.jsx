import React, { Component } from "react"
import './App.css'
import Todolist from "./components/Todolist"

class App extends Component {
  render(){
    return (
        <div className="todo-container">
          <h1> To-Do List</h1>
      <Todolist />
      </div>
    )
  }
}


export default App;
