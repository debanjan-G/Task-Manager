import ToDoListForm from '@/components/form/todo-list-form'
import React from 'react'
import { auth } from '@/auth'

const ToDoListPage = async ({ params }) => {
    const listTitle = params.listName.split("%20").join(" ")
    const session = await auth()
    return (
        <div className="my-4 p-4 flex flex-col items-center justify-center gap-4">
            <ToDoListForm listTitle={listTitle} author={session.user} />
        </div>
    )
}

export default ToDoListPage
