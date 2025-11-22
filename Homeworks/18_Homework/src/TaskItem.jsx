import React, { useState, useEffect } from "react";

const TaskItem = ({ task, prevStatus, id, onUpdate }) => {
    const [checked, setChecked] = useState(prevStatus || false);
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task || "");

    useEffect(() => {
        setEditedTask(task || "");
    }, [task]);

    


    const handleEdit = () => setEditing(true);

    const handleSave = () => {
        setEditing(false);
        // Call parent function to save changes
        onUpdate(id, editedTask, checked);
    };

    const handleCheckbox = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onUpdate(id, editedTask, newChecked);
    };

    return (
        
            <div id={id}>
                {editing ? (
                    <div><div>
                        <input
                            type="text"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                        />
                        {task}
                    </div>
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <div><div>
                        <input type="checkbox" checked={checked} onChange={handleCheckbox} />
                        <span style={{ marginLeft: "8px" }}>{editedTask}</span>
                    </div>
                        {checked ? " completed" : " not completed"}
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </div>
    );
};

export default TaskItem;
