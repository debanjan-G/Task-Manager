import { connectDB } from "@/lib/connectDB";
import TaskList from "@/lib/models/task-list-model";
import User from "@/lib/models/user-model";
import { NextResponse } from "next/server";

// Get all Task Lists of a particular author/user

export async function GET(req) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const authorName = queryParams.get("author");
    // Get the author ID
    const author = await User.findOne({ name: authorName });
    // Find all tasklists created by the author
    const taskLists = await TaskList.find({ author: author._id });
    return NextResponse.json({
      success: true,
      count: taskLists.length,
      taskLists,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      {
        msg: "Oops! Something Went Wrong. Check server console.",
      },
      { status: 500 }
    );
  }
}

// Create a New Task List
export async function POST(req) {
  try {
    await connectDB();
    const reqBody = await req.json(); // get the List title from req body
    const taskTitle = reqBody.title;
    const authorID = reqBody.author;

    // check if task list already exists
    const taskList = await TaskList.findOne({
      title: taskTitle,
      author: authorID,
    });

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
      author: authorID,
    });

    await newTaskList.save();

    return NextResponse.json(
      {
        success: true,
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
