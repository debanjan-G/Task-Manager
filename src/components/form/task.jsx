import React from 'react'

const Task = ({ task }) => {
    return (
        <div>
            <p className='my-4 text-xl text-slate-700 font-light'>{task}</p>
        </div>
    )
}

export default Task
