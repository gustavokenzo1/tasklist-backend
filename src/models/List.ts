import { model, Schema } from "mongoose";

const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const List = model("List", ListSchema);
export default List;
