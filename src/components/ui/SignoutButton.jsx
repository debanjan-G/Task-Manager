import React from 'react'
import { auth, signOut } from '@/auth';


const SignoutButton = async () => {
    // const router = useRouter()
    const session = await auth();
    return (

        <div className='text-center'>
            {session && session.user ?
                <form action={async () => {
                    'use server'
                    await signOut();
                    // router.push('/')
                }}>
                    <button type='submit' className='mx-auto bg-red-500 hover:bg-red-600 p-3 rounded-sm text-white font-bold'>Logout</button>
                </form>
                :
                null}

        </div>
    )
}

export default SignoutButton
