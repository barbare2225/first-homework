import { Component } from "react";

class Todolist extends Component {
  state = {
    inputValue: "",
    todos: [],
    completed: [],
  };

  onChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  addTask = (event) => {
    event.preventDefault();

    if (this.state.inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: this.state.inputValue,
    };

    this.setState((prev) => ({
      todos: [...prev.todos, newTask],
      inputValue: "",
    }));
  };

  completeTask = (id) => {
    const task = this.state.todos.find((t) => t.id === id);
    this.setState((prev) => ({
      todos: prev.todos.filter((t) => t.id !== id),
      completed: [...prev.completed, task],
    }));
  };

  deleteTask = (id) => {
    this.setState((prev) => ({
      completed: prev.completed.filter((t) => t.id !== id),
    }));
  };

  moveBackToTodo = (id) => {
    const task = this.state.completed.find((t) => t.id === id);
    this.setState((prev) => ({
      completed: prev.completed.filter((t) => t.id !== id),
      todos: [...prev.todos, task],
    }));
  };

  render() {
    const { inputValue, todos, completed } = this.state;

    return (
      <div className="todo-container">
        <form onSubmit={this.addTask} className="todo-form">
          <input
            type="text"
            placeholder="Add new task"
            onChange={this.onChange}
            value={inputValue}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="columns">
          {/* შესასრულებელი დავალებები */}
          <div className="column">
            <h2>შესასრულებელი</h2>
            {todos.length === 0 ? (
              <p></p>
            ) : (
              todos.map((task) => (
                <div key={task.id} className="task-item">
                  <span>{task.text}</span>
                  <button onClick={() => this.completeTask(task.id)}>
                    დასრულება
                  </button>
                </div>
              ))
            )}
          </div>

          {/* შესრულებული დავალებები */}
          <div className="column">
            <h2>შესრულებული</h2>
            {completed.length === 0 ? (
              <p></p>
            ) : (
              completed.map((task) => (
                <div key={task.id} className="task-item">
                  <span className="done">{task.text}</span>
                  <button onClick={() => this.moveBackToTodo(task.id)}>
                    დაბრუნება
                  </button>
                  <button onClick={() => this.deleteTask(task.id)}>
                    წაშლა
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Todolist;
