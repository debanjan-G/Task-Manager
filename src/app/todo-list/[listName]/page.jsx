import ToDoListForm from '@/components/form/todo-list-form'
import React from 'react'

const ToDoListPage = ({ params }) => {
    return (
        <div className="my-4 p-4 flex flex-col items-center justify-center gap-4">
            <h1 className='text-4xl font-bold'>{params.listName.toUpperCase()} todo</h1>
            <ToDoListForm />
        </div>
    )
}

export default ToDoListPage
