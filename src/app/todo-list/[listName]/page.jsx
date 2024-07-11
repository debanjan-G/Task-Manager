import ToDoListForm from '@/components/form/todo-list-form'
import React from 'react'

const ToDoListPage = ({ params }) => {
    const listTitle = params.listName.toUpperCase()
    return (
        <div className="my-4 p-4 flex flex-col items-center justify-center gap-4">
            <ToDoListForm listTitle={listTitle} />
        </div>
    )
}

export default ToDoListPage
