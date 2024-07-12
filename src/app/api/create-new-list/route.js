import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const taskTitle = await req.json(); // get the List title from req body

    // create a new document
    const newTaskList = new TaskList({
      title: taskTitle.title,
    });

    await newTaskList.save();

    return NextResponse.json(
      {
        successs: true,
        savedList: newTaskList,
        url: `/todo-list/${taskTitle.title}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
