import mongoose from "mongoose";

const TaskListSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
});

const TaskList =
  mongoose.models.TaskList || new mongoose.model("TaskList", TaskListSchema);

export default TaskList;
