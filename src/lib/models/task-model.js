import mongoose, { Mongoose } from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskList",
    requried: true,
  },
  task: {
    type: String,
    trim: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.models.Task || new mongoose.model("Task", TaskSchema);

export default Task;
