import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";
import Task from "@/lib/models/task-model";

export async function POST(req) {
  try {
    await connectDB();
    const reqBody = await req.json();

    console.log(reqBody);

    const taskListName = reqBody.taskList;
    const task = reqBody.task;

    // Searching the TaskList collection for a document with the taskListName
    const taskList = await TaskList.findOne({ title: taskListName });
    if (!taskList) {
      return NextResponse.json(
        { success: false, msg: "No such list found" },
        { status: 400 }
      );
    }

    // Creating a new Task document
    const newTask = new Task({
      taskList: taskList._id,
      task,
    });

    // saving the document
    await newTask.save();

    console.log(reqBody);
    return NextResponse.json(
      { success: true, savedTask: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ error });
  }
}
