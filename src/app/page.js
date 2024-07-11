import ToDoListTitleForm from "@/components/form/todo-list-title-form";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="m-4 p-6 " >
      <ToDoListTitleForm />
    </div>
  );
}
