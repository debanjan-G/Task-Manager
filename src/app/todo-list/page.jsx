import ToDoListTitleForm from "@/components/form/todo-list-title-form";
import { auth, signIn, signOut } from "@/auth";
import SigninImage from "../../../public/signin-image.jpg"
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


import SignoutButton from "@/components/ui/SignoutButton";

// do authentication here
export default async function CreateNewList() {

    const session = await auth();

    const logout = async () => {
        await signOut();
    }

    return (
        <div className="m-4 p-6 " >
            {session && session.user

                ? <div>
                    <SignoutButton />
                    <ToDoListTitleForm userInfo={session.user} />
                </div>
                :
                <div className="flex flex-col items-center justify-center gap-8  w-1/2 mx-auto h-[85vh]">
                    <Alert>
                        {/* <Terminal className="h-4 w-4" /> */}
                        <AlertTitle className='text-lg font-semibold'> Unlock the full potential of TaskTrackr!</AlertTitle>
                        <AlertDescription className='text-xl text-slate-600'>
                            Sign in with Google and take control of your to-do list today.
                        </AlertDescription>
                    </Alert>

                    <Image src={SigninImage} alt='signin-image' className="w-fit h-80" />
                    <form action={async () => {
                        'use server'
                        await signIn()
                    }}>
                        <button className="mx-auto bg-[#4D869C] py-2 px-4 rounded-sm text-white font-bold hover:bg-[#0E7490] text-xl">Signin</button>
                    </form>
                </div>

            }

        </div>

    );
}

/**
 * ATTRIBUTION:
 * <a href="https://www.freepik.com/free-vector/tablet-login-concept-illustration_20602937.htm#fromView=search&page=1&position=7&uuid=eb394fc8-9028-4f12-968e-6d10d0b732e2">Image by storyset on Freepik</a>
 */
