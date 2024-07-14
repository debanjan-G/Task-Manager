import ToDoListTitleForm from "@/components/form/todo-list-title-form";
import Image from "next/image";
import HeroImage from "../../public/HeroImage.jpg"
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-4 p-6 flex items-center justify-center gap-8">
      <div className="w-1/3">
        <h1 className="text-5xl font-extrabold text-[#0E7490] my-4">Struggling to stay organized?</h1>
        <h1 className="text-2xl my-4 font-light"> Simplify your tasks and stay on track effortlessly.</h1>

        <Link href='/todo-list' className="w-1/6 mx-auto bg-[#4D869C] p-3 rounded-sm text-white font-bold hover:bg-[#0E7490]">Get Started</Link>

      </div>
      <Image src={HeroImage} className="w-72" alt='Productivity Image' />

    </div>
  );
}
