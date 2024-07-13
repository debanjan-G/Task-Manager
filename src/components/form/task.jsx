import React from 'react'


const Task = ({ task, isComplete, onComplete, id }) => {
    const markingClass = (isComplete) && 'line-through'
    return (
        <div className='text-left px-8 flex gap-4'>
            <input type='checkbox' onClick={onComplete} id={id} />
            <p className={`${markingClass} my-4 text-xl text-slate-700 font-light`}>{task}</p>

        </div>
    )
}

export default Task
