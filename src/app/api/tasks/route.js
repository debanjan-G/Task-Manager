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
    console.log("LIST TITLE = ", listTitle);

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

// Mark Task as Completed
export async function PUT(req) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const checked = reqBody.checked;
    // getting the ID of the task whose isComplete field is to be toggled
    const taskID = req.nextUrl.searchParams.get("listID");

    // getting the task by ID
    const taskToMark = await Task.findById(taskID);
    // if task doesn't exist
    if (!taskToMark) {
      return NextResponse.json(
        { success: false, msg: "No Such Task Found!" },
        { status: 404 }
      );
    }

    console.log(taskToMark);

    const isComplete = checked ? true : false;

    // if task exists, we update the field (toggle the isCompleted field)
    const updatedTask = await Task.findByIdAndUpdate(
      taskID,
      {
        isCompleted: isComplete,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        updatedTask: updatedTask,
        isComplete: isComplete,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
