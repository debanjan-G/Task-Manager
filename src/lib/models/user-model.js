import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    required: [true, "The user must have a name!"],
    trim: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const User = mongoose.models.User || new mongoose.model("User", UserSchema);

export default User;
