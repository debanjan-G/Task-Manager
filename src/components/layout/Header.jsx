'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathName = usePathname()
    console.log(pathName);
    const hoverStyle = (pathName !== '/') && 'hover:text-[#FEF9C3] hover:cursor-pointer'
    return (
        <div className='bg-[#4D869C] p-3 flex justify-evenly'>
        
            <Link href='/' className={`${hoverStyle}  text-4xl font-extrabold text-center text-white  duration-300 transition ease-in-out`}>TaskTrackr</Link>
        </div>
    )
}

export default Header
