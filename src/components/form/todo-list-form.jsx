'use client'
import React, { useState } from 'react'
import Task from './task';


const ToDoListForm = ({ listTitle }) => {

    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState(["Warmup", "Workout", "Come Home"]);


    const handleClick = () => {
        setShowForm(true)
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks(prev => [...prev, task])
        setTask('')
        setShowForm(false);
    }


    return (
        <div className='flex flex-col min-h-[75vh] items-center justify-center gap-4 w-full'>
            <div className=' bg-[#4D869C] p-4 text-white text-xl font-bold text-center w-1/4'>
                <h1>{listTitle} todo</h1>
            </div>

            {tasks.length !== 0 && <div className='w-1/4 p-4 bg-white flex flex-col justify-center  gap-4 shadow-lg'>

                {tasks.map((task, index) => {
                    return (
                        <div key={index} className='text-left px-8 flex gap-4'>
                            <input type="checkbox" name="" id="" />
                            <Task task={task} />
                        </div>
                    );
                })}
            </div>}




            <div className='w-full text-center'>
                {showForm
                    ?
                    <form className='flex flex-col gap-4'>
                        <input onChange={handleChange} type="text" value={task} placeholder='Add Task' className="text-xl font-bold shadow-md p-4 rounded-sm w-1/4 mx-auto" required />
                        <div className="flex justify-center w-1/4 mx-auto gap-4">
                            <button onClick={handleSubmit} className=" mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl w-full">Add Task</button>
                            <button onClick={() => setShowForm(false)} className="mx-auto bg-white p-4 text-[#4D869C] font-bold hover:bg-teal-100 rounded-2xl w-full">Cancel</button>
                        </div>
                    </form>
                    : <button onClick={handleClick} className="w-1/6 mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl">+ New Task</button>}


            </div>

        </div >
    )
}

export default ToDoListForm
