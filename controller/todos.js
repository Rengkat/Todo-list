const getTodos =
  ("/",
  (req, res) => {
    res.send("Get todos");
  });
const createTodo =
  ("/",
  (req, res) => {
    const { todo } = req.body;
    res.status(200).send("create todo");
  });
const deleteTodo =
  ("/:id",
  (req, res) => {
    res.send("delete");
  });
module.exports = { getTodos, createTodo, deleteTodo };
