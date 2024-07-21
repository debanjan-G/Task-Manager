import User from "@/lib/models/user-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { name, email } = reqBody;

    //checking if user is already saved in DB
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        success: true,
        msg: "User login successful.",
        user,
      });
    }

    const newUser = new User({ name, email });

    await newUser.save(); // Since the field values are the same, there will be no actual changes to the document in the database if the user is already saved in the DB.

    return NextResponse.json({
      success: true,
      newUser,
      msg: "User registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
  }
}
