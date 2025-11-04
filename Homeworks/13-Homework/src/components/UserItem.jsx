import React, { PureComponent } from 'react'

class Taskitem extends PureComponent {  

  handleResize = () => {
    console.log('user' + this.props.id)
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize)
  }

 render() {
    const { id, text, onAction, onDelete, actionLabel, done } = this.props;

    return (
      <div className="task-item">
        <span className={done ? "done" : ""}>{text}</span>
        <button onClick={() => onAction(id)}>{actionLabel}</button>
        {onDelete && <button onClick={() => onDelete(id)}>წაშლა</button>}
      </div>
    );
  }
}

export default Taskitem