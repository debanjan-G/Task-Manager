import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json(
      { message: "create-new-post Route" },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

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
        msg: "New List Created successfully",
        savedList: newTaskList,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ error });
  }
}
