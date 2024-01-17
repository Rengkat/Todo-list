const mongoose = require("mongoose");
const TodosSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Please enter task"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Todos", TodosSchema);
