const getTodos =
  ("/",
  (req, res) => {
    res.send("Get todos");
  });
const createTodo =
  ("/",
  (req, res) => {
    res.send("post todos");
  });
const deleteTodo =
  ("/:id",
  (req, res) => {
    res.send("delete");
  });
module.exports = { getTodos, createTodo, deleteTodo };
