import Task from "@/lib/models/task-model";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    // getting hold of the ID of the task to be deleted
    const taskID = context.params.taskID;
    console.log("TASK ID = ", taskID);

    // deleting the task from the DB
    const deletedTask = await Task.findByIdAndDelete(taskID);
    // if task not found
    if (!deletedTask) {
      return NextResponse.json(
        { success: false, msg: "No Such Task Found" },
        { status: 400 }
      );
    }
    // if task is found and deleted successfully
    return NextResponse.json({ success: true, deletedTask });
  } catch (error) {
    console.log("SOMETHING WENT WRONG: ", error);
    return NextResponse.json({ success: false, error });
  }
}
