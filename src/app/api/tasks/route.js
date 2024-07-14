import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";
import Task from "@/lib/models/task-model";
import { list } from "postcss";

// Get all tasks
export async function GET(req) {
  try {
    // connecting to the DB
    await connectDB();
    // get the list title
    const queryParams = req.nextUrl.searchParams;
    const listTitle = queryParams.get("list");

    // get the List document from DB
    const list = await TaskList.findOne({ title: listTitle });
    if (!list) {
      return NextResponse.json({
        success: false,
        msg: "No Such Task List Found!",
      });
    }
    const taskListID = list._id;

    // get the tasks of that particular Task List
    const tasks = await Task.find({ taskList: taskListID });
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      { success: false, msg: "Something Went Wrong" },
      { status: 500 }
    );
  }
}

// Create a New Task
export async function POST(req) {
  try {
    await connectDB();
    const reqBody = await req.json();

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

    return NextResponse.json(
      { success: true, savedTask: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ error });
  }
}
