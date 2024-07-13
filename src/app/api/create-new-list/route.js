import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const reqBody = await req.json(); // get the List title from req body
    const taskTitle = reqBody.title;

    // check if task list already exists
    const taskList = await TaskList.findOne({ title: taskTitle });

    if (taskList) {
      console.log("TaskList already exists.");
      return NextResponse.json({
        msg: "Task List Already exists",
        url: `/todo-list/${taskTitle}`,
      });
    }

    // If Task List doesn't exist
    // create a new document
    const newTaskList = new TaskList({
      title: taskTitle,
    });

    await newTaskList.save();

    return NextResponse.json(
      {
        successs: true,
        savedList: newTaskList,
        url: `/todo-list/${taskTitle}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
