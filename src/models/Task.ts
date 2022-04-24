const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = model("Task", TaskSchema);
export default Task;
