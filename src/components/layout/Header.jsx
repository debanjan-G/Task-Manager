'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathName = usePathname()
    console.log(pathName);
    const hoverStyle = (pathName !== '/') && 'hover:text-[#FEF9C3] hover:cursor-pointer'
    return (
        <div className='bg-[#4D869C] p-3'>
            {/* <p className="text-xl font-bold hover:text-blue-500 transition duration-300 ">
  Hover over me for a glow effect!
</p> */}
            <Link href='/' className={`${hoverStyle}  text-4xl font-extrabold text-center text-white  duration-300 transition ease-in-out`}>TaskTrackr</Link>
        </div>
    )
}

export default Header
