import React from 'react'

const ToDoListForm = ({ listTitle }) => {
    return (
        <div className='flex flex-col min-h-[75vh] items-center justify-center gap-4 w-full'>
            <div className=' bg-[#4D869C] p-4 text-white font-bold text-center w-1/4'>
                <h1>{listTitle}</h1>
            </div>

            <div className='w-1/4 p-4 bg-white flex flex-col justify-center  gap-4 shadow-lg'>
                <ul className='text-left list-disc px-8'>
                    <li className='my-4 text-xl text-slate-700 font-light'>Design</li>
                    <li className='my-4 text-xl text-slate-700 font-light'>Develop</li>
                    <li className='my-4 text-xl text-slate-700 font-light'>Deploy</li>
                </ul>


            </div>
            <div className='w-full text-center'>
                <button className="w-1/6 mx-auto bg-[#4D869C] p-4 text-white font-bold hover:bg-[#0E7490] rounded-2xl">+ New Task</button>
            </div>

        </div>
    )
}

export default ToDoListForm
