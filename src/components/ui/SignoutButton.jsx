import React from 'react'
import { auth, signOut } from '@/auth';
import LogoutSVG from './LogoutSVG';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



const SignoutButton = async () => {
    // const router = useRouter()
    const session = await auth();

    return (
        <span className='flex justify-end'>
            {session && session.user &&
                <AlertDialog>
                    <AlertDialogTrigger>
                        <LogoutSVG />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to log out? Your unsaved changes may be lost.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>

                            <form action={async () => {
                                'use server'
                                await signOut();
                                // router.push('/')
                            }}>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <button type='submit'>
                                    <AlertDialogAction className='bg-red-500 hover:bg-red-700'>Continue</AlertDialogAction>
                                </button>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }

        </span >
    )
}

export default SignoutButton
