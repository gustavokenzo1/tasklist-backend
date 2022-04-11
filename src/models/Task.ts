const { Schema, model } = require("mongoose");

const taskModel = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: "List",
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

const Task = model("Task", taskModel);
export default Task;
