import React, {useState} from "react";

const Tasks = ({onFormSubmit}) => {
    const [task, setTask] = useState("");
    const [checked, setChecked] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(task, checked);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter Task"
                    onChange={(e)=>setTask(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />{' '}
                    Mark as completed
                </label>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
    
};

export default Tasks;