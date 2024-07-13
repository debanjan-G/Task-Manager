'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { connectDB } from '@/lib/connectDB';
import axios from 'axios';


const ToDoListTitleForm = () => {
    const [listName, setListName] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const listName = e.target.value;
        setListName(listName);
    }

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();

            // Check if TaskList already exists


            const response = await axios.post('http://localhost:3000/api/create-new-list', { title: listName })
            const url = await response.data.url;
            router.push(url)

        } catch (error) {
            console.log("ERROR: ", error);
        }

    }

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <input onChange={handleChange} className="text-xl font-bold shadow-md p-4 rounded-sm w-1/3 mx-auto" value={listName} type="text" name="list-name" required placeholder="Enter To-Do List Name" />
                <button href='/todo' type='submit' className="w-1/6 mx-auto bg-[#4D869C] p-3 rounded-sm text-white font-bold hover:bg-[#0E7490]">Create New ToDo List</button>
                <p className='w-1/2 mx-auto text-center font-light text-lg'>If a to-do list with the specified name already exists, you will be redirected to the existing list.</p>
            </form>
        </div>
    )
}

export default ToDoListTitleForm
