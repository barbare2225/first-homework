import React, { PureComponent } from "react";

// მთავარი Todolist კომპონენტი
class Todolist extends PureComponent {
  state = {
    inputValue: "",
    todos: [],
    completed: [],
  };

  onChange = (e) => this.setState({ inputValue: e.target.value });

  addTask = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (!inputValue.trim()) return;

    const newTask = { id: Date.now(), text: inputValue };
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.inputValue !== this.state.inputValue ||
      nextState.todos !== this.state.todos ||
      nextState.completed !== this.state.completed
    );
  }

  render() {
    const { inputValue, todos, completed } = this.state;
    return (
      <div>
        <form onSubmit={this.addTask} className="todo-form">
          <input
            type="text"
            placeholder="Add new task"
            value={inputValue}
            onChange={this.onChange}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="columns">
          <div className="column">
            <h2>შესასრულებელი</h2>
            <TodoList tasks={todos} completeTask={this.completeTask} />
          </div>

          <div className="column">
            <h2>შესრულებული</h2>
            <DoneTasks
              doneTasks={completed}
              onReset={this.moveBackToTodo}
              onDelete={this.deleteTask}
            />
          </div>
        </div>
      </div>
    );
  }
}

// აქტიური დავალებების სია
const TodoList = React.memo(({ tasks, completeTask }) => {
  console.log("TodoList rendered"); 
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.text}</span>
          <button onClick={() => completeTask(task.id)}>დასრულება</button>
        </li>
      ))}
    </ul>
  );
});

// შესრულებული დავალებების სია
const DoneTasks = React.memo(({ doneTasks, onReset, onDelete }) => {
  console.log("DoneTasks rendered"); 
  return (
    <ul>
      {doneTasks.map((task) => (
        <li key={task.id} className="task-item">
          <span className="done">{task.text}</span>
          <button onClick={() => onReset(task.id)}>დაბრუნება</button>
          <button onClick={() => onDelete(task.id)}>წაშლა</button>
        </li>
      ))}
    </ul>
  );
});

export default Todolist;
