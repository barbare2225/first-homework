import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Tasks from './Tasks';




function App() {
  const [taskList, setTaskList] = useState([]);

  const onFormSubmit = (task, checked) => {
    fetch("https://692155fd512fb4140bdff13c.mockapi.io/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ name: task, isCompleted: checked }])
    })
      .then(res => {
        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();
      })
      .then((data) => {
        setTaskList((prev) => [
          ...prev,
          { name: data.name, isCompleted: data.isCompleted, uuid: data.uuid },]);
      })
      .catch(error => console.log(error.message));
  };


  useEffect(() => {
    fetch("https://692155fd512fb4140bdff13c.mockapi.io/tasks", {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();
      })
      .then(data => {
        const normalizedTasks = data.map(item => {
          if (item.name && item.isCompleted !== undefined) {
            // task is already flat
            return { ...item, uuid: item.uuid || item.id };
          } else if (item[0]) {
            // task is nested under "0"
            return { ...item[0], uuid: item.uuid };
          } else {
            return null; // skip invalid items
          }
        }).filter(Boolean); // remove nulls

        setTaskList(normalizedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleUpdate = (id, name, isCompleted) => {
    setTaskList(prev =>
      prev.map(task =>
        task.id === id ? { ...task, name, isCompleted } : task
      )
    );

    // Update backend
    fetch(`https://692155fd512fb4140bdff13c.mockapi.io/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, isCompleted })
    }).catch(err => console.log(err));
  };



  return (
    <div>
      <Tasks onFormSubmit={onFormSubmit} />
      {taskList.map(task => (
        <TaskItem
          task={task.name}
          prevStatus={task.isCompleted}
          id={task.uuid}
          key={task.uuid}
          onUpdate={handleUpdate}
          onf={onFormSubmit}
        />
      ))}

    </div>
  );
}

export default App;
