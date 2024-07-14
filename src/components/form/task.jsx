import React, { useState } from 'react'
import axios from 'axios'
import DeleteIcon from '../ui/DeleteIcon'
import Loading from '../ui/Loading/Loading'
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


const Task = ({ task, fetchTasks }) => {

    const [isComplete, setIsComplete] = useState(false)
    const [loading, setLoading] = useState(false);

    // const toggleMark = async (e) => {
    //     try {
    //         const checked = e.target.checked;
    //         const taskID = task._id;


    //         const response = await axios.put(`http://localhost:3000/api/tasks?listID=${taskID}`, { checked })
    //         console.log(response);
    //         setIsComplete(response.data.isComplete)

    //     } catch (error) {
    //         console.log("ERROR: ", error);
    //     }
    // }

    const deleteTask = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`http://localhost:3000/api/tasks/${task._id}`)
            console.log("Deleted Task = ", response.data.deletedTask);

        } catch (error) {
            console.log("Something Went Wrong: ", error);
        } finally {
            await fetchTasks();
            setIsComplete(false)
            setLoading(false)
        }
    }

    const handleCheckboxClick = (e) => {
        const isChecked = e.target.checked;
        setIsComplete(isChecked ? true : false)
    }

    const markingClass = (isComplete) && 'line-through'

    return (
        <>
            {loading ? <div className='w-full flex justify-center'> <Loading /> </div> :
                <div className='text-left px-8 flex items-center gap-4'>

                    <input type='checkbox' onChange={handleCheckboxClick} />
                    <p className={`${markingClass} my-4 text-xl text-slate-700 font-light`}>{task.task}</p>
                    {isComplete &&
                        <AlertDialog>
                            <AlertDialogTrigger><DeleteIcon /></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action is irreversible. Deleting this task will permanently remove it from the list and cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-red-500 hover:bg-red-700' onClick={deleteTask}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    }

                </div>}
        </>
    )
}

export default Task
