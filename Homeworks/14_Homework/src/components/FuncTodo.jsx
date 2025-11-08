import React, { useState, useCallback } from 'react';

// Single task item for active tasks
const TodoItem = React.memo(({ task, id, onDone, onDelete }) => {
  console.log('Rendering active task:', task);
  return (
    <li>
      {task}
      <button onClick={() => onDone(id)}>დასრულება</button>
      <button onClick={() => onDelete(id)}>წაშლა</button>
    </li>
  );
});

// Single task item for completed tasks
const DoneTask = React.memo(({ task, id, onReset, onDelete }) => {
  console.log('Rendering done task:', task);
  return (
    <li>
      {task}
      <button onClick={() => onReset(id)}>გადატანა აქტიურებში</button>
      <button onClick={() => onDelete(id)}>წაშლა</button>
    </li>
  );
});

const FuncTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  // Input change handler
  const handleChange = useCallback((e) => {
    setCurrentTask(e.target.value);
  }, []);

  // Form submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!currentTask.trim()) return; // prevent empty tasks
      setTasks((prev) => [...prev, currentTask]);
      setCurrentTask('');
    },
    [currentTask]
  );

  // Delete active task
  const handleDelete = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((_, index) => index !== id));
    },
    []
  );

  // Mark task as done
  const handleDone = useCallback(
    (id) => {
      setTasks((prev) => {
        const task = prev[id];
        setDoneTasks((donePrev) => [...donePrev, task]);
        return prev.filter((_, index) => index !== id);
      });
    },
    []
  );

  // Delete done task
  const handleDoneDelete = useCallback(
    (id) => {
      setDoneTasks((prev) => prev.filter((_, index) => index !== id));
    },
    []
  );

  // Reset done task back to active
  const handleReset = useCallback(
    (id) => {
      setDoneTasks((prev) => {
        const task = prev[id];
        setTasks((tasksPrev) => [...tasksPrev, task]);
        return prev.filter((_, index) => index !== id);
      });
    },
    []
  );

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter a task"
          value={currentTask}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>Active Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            id={index}
            task={task}
            onDone={handleDone}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {doneTasks.map((task, index) => (
          <DoneTask
            key={index}
            id={index}
            task={task}
            onReset={handleReset}
            onDelete={handleDoneDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default FuncTodo;
