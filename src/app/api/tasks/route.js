import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json({ msg: "Fetching all tasks" });
  } catch (error) {
    console.log("ERROR");
    return NextResponse.json({ message: "Something Went Wrong", error });
  }
}
