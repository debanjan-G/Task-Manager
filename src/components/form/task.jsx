import React, { useState } from 'react'
import axios from 'axios'
import DeleteIcon from '../ui/DeleteIcon'

const Task = ({ task }) => {

    const [isComplete, setIsComplete] = useState(false)

    const toggleMark = async (e) => {
        try {
            const checked = e.target.checked;
            const taskID = task._id;


            const response = await axios.put(`http://localhost:3000/api/tasks?listID=${taskID}`, { checked })
            console.log(response);
            setIsComplete(response.data.isComplete)

        } catch (error) {
            console.log("ERROR: ", error);
        }
    }

    const deleteTask = async () => {
        try {
            console.log("Deleting Task with ID: ", task._id);
        } catch (error) {
            console.log("Something Went Wrong: ", error);
        }
    }

    const markingClass = (isComplete) && 'line-through'
    return (
        <div className='text-left px-8 flex items-center gap-4'>
            <input type='checkbox' onClick={toggleMark} />
            <p className={`${markingClass} my-4 text-xl text-slate-700 font-light`}>{task.task}</p>
            {isComplete && <span onClick={deleteTask} className='hover:cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 duration-200 transition'> <DeleteIcon /></span>}

        </div>
    )
}

export default Task
