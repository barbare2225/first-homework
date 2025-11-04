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
          {/* To-Do tasks */}
          <div className="column">
            <h2>შესასრულებელი</h2>
            <TodoList
              tasks={todos}
              completeTask={this.completeTask}
              deleteTask={this.deleteTask}
            />
          </div>

          {/* Completed tasks */}
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
const TodoList = React.memo(({ tasks, completeTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onAction={completeTask}
          onDelete={deleteTask}
          actionLabel="დასრულება"
        />
      ))}
    </ul>
  );
});

// შესრულებული დავალებების სია
const DoneTasks = React.memo(({ doneTasks, onReset, onDelete }) => {
  return (
    <ul>
      {doneTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onAction={onReset}
          onDelete={onDelete}
          actionLabel="დაბრუნება"
          done
        />
      ))}
    </ul>
  );
});

// თითოეული დავალება
const TaskItem = React.memo(
  ({ task, onAction, onDelete, actionLabel, done }) => {
    console.log(`TaskItem rendered: ${task.text}`); // შეგიძლიათ ნახოთ რენდერი კონსოლში
    return (
      <li className="task-item">
        <span className={done ? "done" : ""}>{task.text}</span>
        <div>
          <button onClick={() => onAction(task.id)}>{actionLabel}</button>
          {onDelete && <button onClick={() => onDelete(task.id)}>წაშლა</button>}
        </div>
      </li>
    );
  }
);

export default Todolist;
