const Todos = require("../models/todos");
const getTodos = async (req, res) => {
  try {
    const todo = await Todos.find({});
    res.status(200).json({ todo });
  } catch (error) {}
};
const createTodo = async (req, res) => {
  try {
    const todo = req.body;

    const singleTodo = await Todos.create(todo);
    res.status(201).json({ singleTodo });
  } catch (error) {
    console.log(error);
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todos.findByIdAndDelete({ id });

  if (!todo) {
    return res.status(404).json({ msg: "Not found" });
  } else {
    return res.status(200).json({ todos });
  }
};
const deleteAll = async (req, res) => {
  try {
    await Todos.deleteMany({});
    res.status(200).json({ msg: "All todos deleted" });
  } catch (error) {
    return res.status(404).json({ msg: "Not found" });
  }
};
module.exports = { getTodos, createTodo, deleteTodo, deleteAll };
