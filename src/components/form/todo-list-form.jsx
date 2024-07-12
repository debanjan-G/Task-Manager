'use client'
import React, { useState } from 'react'
import Task from './task';
import Image from 'next/image';
import checkBox from "../../../public/checkbox.svg"



const ToDoListForm = ({ listTitle }) => {

    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState(["Clean Room", "Wash Dishes", "Cook Meal"]);
    const [markComplete, setMarkComplete] = useState(false);


    const handleClick = () => {
        setShowForm(true)
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks(prev => [...prev, task.trim()])
        setTask('')
        setShowForm(false);
    }

    const markAsCompleted = (e) => {
        console.log("Task with ID " + (e.target.id + 1) + " has been marked complete.");
        setMarkComplete(prev => !prev);
    }


    return (
        <div className='flex flex-col min-h-[75vh] items-center justify-center gap-4 w-full'>
            <div className=' bg-[#4D869C] p-4 text-white text-xl font-bold text-center w-1/4'>
                <h1>{listTitle} todo</h1>
            </div>

            <div className='w-1/4 p-4 bg-white flex flex-col justify-center  gap-4 shadow-lg'>
                {(tasks.length !== 0) ? (tasks.map((task, index) => {
                    return (
                        <div key={index} className='text-left px-8 flex gap-4'>
                            <input type='checkbox' onClick={markAsCompleted} />
                            <Task task={task} isComplete={markComplete} />
                        </div>
                    )
                })
                ) : <p className=" my-4 text-xl text-center text-slate-700 font-light">Your To-Do List is Empty!</p>}
            </div>




            <div className='w-full text-center'>
                {showForm
                    ?
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input onChange={handleChange} type="text" value={task} placeholder='Add Task' className="text-xl font-bold shadow-md p-4 rounded-sm w-1/4 mx-auto " required />
                        <div className="flex justify-center w-1/4 mx-auto gap-4">
                            <button type='submit' className=" mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl w-full">Add Task</button>
                            <button type='reset' onClick={() => setShowForm(false)} className="mx-auto bg-white p-4 text-[#4D869C] font-bold hover:bg-teal-100 rounded-2xl w-full">Cancel</button>
                        </div>
                    </form>
                    : <button onClick={handleClick} className="w-1/6 mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl">+ New Task</button>}


            </div>

        </div >
    )
}

export default ToDoListForm
