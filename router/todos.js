const express = require("express");
const { getTodos, createTodo, deleteTodo } = require("../controller/todos");
const router = express.Router();
router.route("/").get(getTodos).post(createTodo);
router.route("/id").delete(deleteTodo);
module.exports = router;
