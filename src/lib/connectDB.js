import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection to Database successfully established.");
  } catch (error) {
    console.log("Something Went Wrong: ", error);
  }
};
