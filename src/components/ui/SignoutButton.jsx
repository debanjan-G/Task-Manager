import React from 'react'
import { auth, signOut } from '@/auth';
import LogoutSVG from './LogoutSVG';


const SignoutButton = async () => {
    // const router = useRouter()
    const session = await auth();
    return (

        <span className='text-right'>
            {session && session.user ?
                <form action={async () => {
                    'use server'
                    await signOut();
                    // router.push('/')
                }}>
                    <button type='submit'>
                        <LogoutSVG />
                    </button>
                </form>
                :
                null}

        </span>
    )
}

export default SignoutButton
