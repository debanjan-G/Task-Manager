'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { connectDB } from '@/lib/connectDB';
import axios from 'axios';
import { signOut } from '@/auth';
import Image from 'next/image';
import DP from "../../../public/DP.png"
import TaskListPreview from '../ui/TaskListPreview';
import Loading from '../ui/Loading/Loading';

const ToDoListTitleForm = ({ userInfo }) => {
    const [listName, setListName] = useState('');
    const [userID, setUserID] = useState('')
    const [taskLists, setTaskLists] = useState([])
    const [taskListCount, setTaskListCount] = useState()
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    //useEffect for fetching all lists of the user
    useEffect(() => {
        const fetchLists = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:3000/api/taskList?author=${userInfo.name}`)
                console.log(response.data);
                setTaskLists([...response.data.taskLists])
                setTaskListCount(response.data.count)
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchLists();
    }, [])

    /** A typical task list
     * {
    "_id": "669c881a470190ad839f5791",
    "author": "669c7ba2be127dae40a71284", // We need the author name instead 
    "title": "skibbidi",
    // we also need the total no of tasks
    "__v": 0
}
     */

    // useEffect for saving user to DB
    useEffect(() => {
        const saveUser = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/users', {
                    ...userInfo
                })

                setUserID(response.data.user._id);
            } catch (error) {
                console.log("ERROR: ", error);
            }
        }

        saveUser();

    }, [userInfo])

    const handleChange = (e) => {
        const listName = e.target.value;
        setListName(listName);
    }

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            console.log("AUTHOR ID ", userID);
            // Check if TaskList already exists
            const response = await axios.post('http://localhost:3000/api/taskList', {
                author: userID, title: listName,
            })
            console.log(response);
            router.push(`/todo-list/${listName}`)

        } catch (error) {
            console.log("ERROR: ", error);
        }

    }

    return (
        <>
            {/* <div className='flex justify-evenly gap-8'> */}
            <div className='flex flex-col gap-4 items-center'>
                <h1 className=' text-center font-bold text-2xl'>Welcome Back</h1>
                <p className='text-center text-[#0E7490] font-extrabold text-4xl'>{userInfo.name}</p>
                <Image src={DP} alt='DP' className='w-fit h-32 rounded-full' />
            </div>

            {/* </div> */}

            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <input onChange={handleChange} className="text-xl font-bold shadow-md p-4 rounded-sm w-1/3 mx-auto" autoComplete='off' value={listName} type="text" name="list-name" required placeholder="Enter To-Do List Name" />
                    <button type='submit' className="w-1/6 mx-auto bg-[#4D869C] p-3 rounded-sm text-white font-bold hover:bg-[#0E7490]">Create New ToDo List</button>
                    <p className='w-1/2 mx-auto text-center font-light text-lg'>If a to-do list with the specified name already exists, you will be redirected to the existing list.</p>
                </form>
            </div>

            {loading ?
                <div className='flex justify-center items-center'> <Loading /></div>
                :
                <div className='flex flex-col items-center ga-4'>
                    <h1 className='my-4 text-3xl font-bold text-[#0E7490]'>Total Task Lists Created: {taskListCount}</h1>
                    <div className='flex gap-4'>
                        {taskLists.map((taskList, index) => <TaskListPreview key={index} listTitle={taskList.title} listAuthor={taskList.author} count={taskListCount} />)}
                    </div>
                </div>
            }
        </>
    )
}

export default ToDoListTitleForm
