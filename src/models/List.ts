const { Schema, model } = require("mongoose");

const listModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tasks: {
    type: [Schema.Types.Object],
    ref: "Task",
  },
});

const List = model("List", listModel);
export default List;
