'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathName = usePathname()
    console.log(pathName);
    const hoverStyle = (pathName !== '/') && 'text-[#CDE8E5] cursor-pointer'
    return (
        <div className='bg-[#4D869C] p-3'>
            <Link href='/' className={`hover:${hoverStyle} text-4xl font-extrabold text-center text-white  duration-200 transition`}>NEXTGEN TO-DO</Link>
        </div>
    )
}

export default Header
