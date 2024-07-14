import TaskList from "@/lib/models/task-list-model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";

export async function DELETE(req, context) {
  try {
    await connectDB();

    console.log(context);
    const listName = context.params.listName;
    console.log("LIST NAME=", listName);
    const deletedList = await TaskList.findOneAndDelete({ title: listName });

    console.log("LIST NAME TO BE DELETED: ", listName);
    console.log("DELETED LIST: ", deletedList);

    if (!deletedList) {
      return NextResponse.json(
        {
          success: false,
          msg: "List Not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedList });
    // return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
}
