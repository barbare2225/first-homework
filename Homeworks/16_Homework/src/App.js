import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [backlog, setBacklog] = useState([
    "Download Android app",
    "Change and update account details in the iOS app"
  ]);

  const [progress, setProgress] = useState([
    "Set up recurring utilities payments",
    "View transaction history by category",
    "Set and monitor progress on financial goals"
  ]);

  const [done, setDone] = useState([
    "Download iOS app",
    "Transfer money between accounts"
  ]);

  const [inputStates, setInputStates] = useState({ backlog: "", progress: "", done: "" });
  const [showInput, setShowInput] = useState({ backlog: false, progress: false, done: false });

  const addTask = (column) => {
    if (!inputStates[column].trim()) return;
    if (column === "backlog") setBacklog([...backlog, inputStates[column]]);
    if (column === "progress") setProgress([...progress, inputStates[column]]);
    if (column === "done") setDone([...done, inputStates[column]]);
    setInputStates({ ...inputStates, [column]: "" });
    setShowInput({ ...showInput, [column]: false });
  };

  const startTask = (i) => {
    const t = backlog[i];
    setBacklog(backlog.filter((_, x) => x !== i));
    setProgress([...progress, t]);
  };

  const finishTask = (i) => {
    const t = progress[i];
    setProgress(progress.filter((_, x) => x !== i));
    setDone([...done, t]);
  };

  const resetTask = (i) => {
    const t = done[i];
    setDone(done.filter((_, x) => x !== i));
    setBacklog([...backlog, t]);
  };

  const deleteFrom = (setter, list, i) => setter(list.filter((_, x) => x !== i));

  return (
    <div className="board-wrapper">
      <h1 className="board-title">Kanban Todo Board</h1>

      <div className="board-columns">

        {/* BACKLOG */}
        <div className="board-column">
          <h2 className="column-title-backlog">Backlog | {backlog.length}</h2>
          {backlog.map((task, i) => (
            <div key={i} className={`task-card ${i % 2 === 0 ? 'border-blue' : 'border-red'}`}>
              {task}
              <div className="task-actions">
                <button onClick={() => startTask(i)}>▶</button>
                <button onClick={() => deleteFrom(setBacklog, backlog, i)}>✕</button>
              </div>
            </div>
          ))}

          {showInput.backlog && (
            <div className="task-input">
              <input
                value={inputStates.backlog}
                onChange={(e) => setInputStates({ ...inputStates, backlog: e.target.value })}
                placeholder="New task..."
              />
              <button className="btn-add" onClick={() => addTask("backlog")}>Add</button>
            </div>
          )}

          <div
            className="btn-plus"
            onClick={() => setShowInput({ ...showInput, backlog: !showInput.backlog })}
          >
            +
          </div>
        </div>

        {/* PROGRESS */}
        <div className="board-column">
          <h2 className="column-title-Inprogress">In progress | {progress.length}</h2>
          {progress.map((task, i) => (
            <div key={i} className={`task-card ${i % 3 === 0 ? 'border-red' : i % 3 === 1 ? 'border-yellow' : 'border-blue'}`}>
              {task}
              <div className="task-actions">
                <button onClick={() => finishTask(i)}>✔</button>
              </div>
            </div>
          ))}

          {showInput.progress && (
            <div className="task-input">
              <input
                value={inputStates.progress}
                onChange={(e) => setInputStates({ ...inputStates, progress: e.target.value })}
                placeholder="New task..."
              />
              <button className="btn-add" onClick={() => addTask("progress")}>Add</button>
            </div>
          )}

          <div
            className="btn-plus"
            onClick={() => setShowInput({ ...showInput, progress: !showInput.progress })}
          >
            +
          </div>
        </div>

        {/* DONE */}
        <div className="board-column">
          <h2 className="column-title-done">Done | {done.length}</h2>
          {done.map((task, i) => (
            <div key={i} className={`task-card ${i % 2 === 0 ? 'border-green' : 'border-blue'}`}>
              {task}
              <div className="task-actions">
                <button onClick={() => resetTask(i)}>↩</button>
                <button onClick={() => deleteFrom(setDone, done, i)}>✕</button>
              </div>
            </div>
          ))}

          {showInput.done && (
            <div className="task-input">
              <input
                value={inputStates.done}
                onChange={(e) => setInputStates({ ...inputStates, done: e.target.value })}
                placeholder="New task..."
              />
              <button className="btn-add" onClick={() => addTask("done")}>Add</button>
            </div>
          )}

          <div
            className="btn-plus"
            onClick={() => setShowInput({ ...showInput, done: !showInput.done })}
          >
            +
          </div>
        </div>

      </div>
    </div>
  );
}
