import React from 'react'

const TodoItem = ({ title,
    description,
    isCompleted,
    updateHandler,
    deleteHandler,
    id }) => {
    return (
        <div className='todo'>
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className='todo-btn'>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => updateHandler(id)} />
                <button
                    className='btn delete-btn'
                    onClick={() => deleteHandler(id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem