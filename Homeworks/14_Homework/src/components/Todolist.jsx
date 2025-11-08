import React, { PureComponent } from "react"

class Todolist extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            currentTask: "",
            doneTasks: []
        }
    }


    handleonChange = (e) => {
        this.setState({ currentTask: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit");
        const newTask = {
            text: this.state.currentTask,
            done: false
        }
        if (this.state.currentTask.trim() !== "") {
            const newTask = this.state.currentTask;
            const tasks = [...this.state.tasks, newTask];
            this.setState({ tasks, currentTask: "" });
        }
    }


    // handleDelete = (index) => {
    //     console.log("delete");
    //     const updatedTasks = [...this.tasks]
    //     updatedTasks.splice(index, 1)
    //     setTasks(updatedTasks)
    // }

    // handleDone = (index) => {
    //     const comletedTask = updatedTasks.splice(index, 1)[0]
    //     const updatedTasks = [...tasks]
    //     completedTasks.done = true
    //     setTasks(updatedTasks)
    //     setDoneTasks([...doneTasks, completedTasks])
    // }


    // handleDoneDelete = (index) => {
    //     const updatedDoneTasks = [...doneTasks]
    //     updatedDoneTasks.splice(index, 1)
    //     setDoneTasks(updatedDoneTasks)
    // }

    // handleReset = (index) => {
    //     const resetTask = doneTasks.splice(index, 1)[0]
    //     setDoneTasks(...doneTasks)
    //     setTasks([...tasks, resetTask])
    // }
    render() {
        return(
        <div>
            <h1>Todo app</h1>

            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="enter a task"
                    onChange={this.handleChange}
                    value={this.currentTask}
                />
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map((task, index) => (
                    <TodoItem
                        key={index}
                        id={index}
                        task={task}
                        onDone={this.handleDone}
                        onDelete={this.handleDelete}
                    />
                ))}
            </ul>
        </div >
        )
    }


}
export default Todolist;