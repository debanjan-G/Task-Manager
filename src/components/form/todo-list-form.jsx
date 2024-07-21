'use client'
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Task from './task';
import axios from 'axios';
import Loading from '../ui/Loading/Loading';
import { useRouter } from 'next/navigation';


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DeleteTaskListIcon from '../ui/DeleteTaskListIcon';



const ToDoListForm = ({ listTitle, author }) => {
    console.log("author prop = ", author);
    const router = useRouter()

    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
        setIsLoading(false)
    }, [])

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `http://localhost:3000/api/tasks?list=${listTitle}&author=${author.name}`
            );
            const fetchedTasks = response.data.tasks;
            console.log("Fetched Tasks: ", fetchedTasks);
            setTasks(fetchedTasks);
        } catch (error) {
            console.log("ERROR: ", error);
        } finally {
            setIsLoading(false);

        }
    };


    const handleClick = () => {
        setShowForm(true)
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault();

            const response = await axios.post('http://localhost:3000/api/tasks', { taskList: listTitle, author: author.name, task })
            console.log(response);
            // Fetching the tasks from DB to update the list on screen
            await fetchTasks();
            setTask('')
            setShowForm(false);
        } catch (error) {
            console.log("ERROR: ", error);
        } finally {
            setIsLoading(false)
        }
    }

    const closeAddNewTaskForm = () => {
        setShowForm(false)
        setTask('')
    }

    const deleteList = async (e) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`http://localhost:3000/api/delete-list/${listTitle}`)
            console.log("To-Do List successfully deleted.");

        } catch (error) {
            console.log("ERROR: ");
        } finally {
            setIsLoading(false)
            router.push('/')

        }

    }

    const firstName = author.name.split(" ")[0] // only the name of the author (No surname)


    return (
        <div className='flex flex-col min-h-[75vh] items-center justify-center gap-4 w-full'>
            {/* <p className='font-semibold text-xl '>Author: {author.name}</p> */}
            <div className=' bg-[#4D869C] flex items-center justify-between p-4  w-1/3'>
                <h1 className='text-white text-2xl font-semibold text-center'>{firstName}'s  {" "}{listTitle} TO-DO
                </h1>



                <AlertDialog>
                    <AlertDialogTrigger>

                        <DeleteTaskListIcon />

                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Do you want to delete this To-Do List?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone and will permanently remove all tasks associated with it from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-400 hover:bg-red-600' onClick={deleteList}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className='w-1/3 p-4 bg-white flex flex-col justify-center  gap-4 shadow-lg'>
                {(tasks.length !== 0) ? (tasks.map((task, index) => {
                    return (
                        <Task setLoading={setIsLoading} key={index} task={task} fetchTasks={fetchTasks} />
                    )
                })
                ) : <p className=" my-4 text-xl text-center text-slate-700 font-light">Your To-Do List is Empty!</p>}
            </div>




            <div className='w-full text-center'>
                {showForm
                    ?
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input onChange={handleChange} type="text" value={task} placeholder='Add Task' className="text-xl font-bold shadow-md p-4 rounded-sm w-1/4 mx-auto " required />

                        {isLoading && <div className='flex justify-center'>  <Loading /></div>}

                        <div className="flex justify-center w-1/4 mx-auto gap-4">
                            <button type='submit' className=" mx-auto bg-[#6aadc8] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl w-full">Add Task</button>
                            <button type='reset' onClick={closeAddNewTaskForm} className="mx-auto bg-white p-4 text-[#4D869C] font-bold hover:bg-red-600 hover:text-white rounded-2xl w-full">Cancel</button>
                        </div>
                    </form>
                    : <button onClick={handleClick} className="w-1/6 mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl"><span className='text-xl'>+</span> New Task</button>}


            </div>

        </div >
    )
}

export default ToDoListForm
