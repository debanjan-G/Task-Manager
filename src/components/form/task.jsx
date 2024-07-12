import React from 'react'


const Task = ({ task, isComplete,id }) => {
    const markingClass = (isComplete) && 'line-through'
    return (
        <div >
            <p className={`${markingClass} my-4 text-xl text-slate-700 font-light`}>{task}</p>

        </div>
    )
}

export default Task
