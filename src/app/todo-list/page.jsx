import ToDoListTitleForm from "@/components/form/todo-list-title-form";
import { auth, signIn, signOut } from "@/auth";
import SigninImage from "../../../public/signin-image.jpg"
import Image from "next/image";
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
                <div className="flex flex-col items-center justify-center gap-8  w-1/2 mx-auto h-screen">
                    <h1 className="text-red-500 text-4xl text-center font-semibold">Please sign in with your Google Account to create a to-do list. </h1>
                    <Image src={SigninImage} alt='signin-image' className="w-fit h-80" />
                    <form action={async () => {
                        'use server'
                        await signIn()
                    }}>
                        <button className="mx-auto bg-[#4D869C] p-3 rounded-sm text-white font-bold hover:bg-[#0E7490]">Signin with Google</button>
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
