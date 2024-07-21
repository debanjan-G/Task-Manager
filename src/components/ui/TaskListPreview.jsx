'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const TaskListPreview = ({ listTitle }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/todo-list/${listTitle}`)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{listTitle}</CardTitle>
                {/* <CardDescription>contains x tasks</CardDescription>s */}
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent> */}
            <CardFooter>
                <button className='border font-semibold p-2 rounded-md border-[#0E7490] hover:bg-[#0E7490] hover:text-white duration-300 transition' onClick={handleClick}>view list</button>
            </CardFooter>
        </Card>

    )
}

export default TaskListPreview
