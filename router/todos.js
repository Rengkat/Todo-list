const express = require("express");
const { getTodos, createTodo, deleteTodo, deleteAll } = require("../controller/todos");
const router = express.Router();
router.route("/").get(getTodos).post(createTodo);
router.route("/:id").delete(deleteTodo);
router.route("/all").delete(deleteAll);
module.exports = router;
