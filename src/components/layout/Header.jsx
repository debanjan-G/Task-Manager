import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='bg-[#4D869C] p-3'>
            <Link href='/' className="text-4xl font-extrabold text-center text-white hover:text-[#CDE8E5] duration-200 transition">NEXTGEN TO-DO</Link>
        </div>
    )
}

export default Header
