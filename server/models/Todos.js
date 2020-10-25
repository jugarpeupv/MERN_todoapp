const { model, Schema } = require("mongoose");

const ObjectId = require("mongoose").Types.ObjectId;

const todosSchema = new Schema({
  userId: ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});

module.exports = model("Todos", todosSchema);
