const express = require("express");
const todos = require("./router/todos");
const notFound = require("./middleware/not-found");
const port = process.env.PORT || 3000;
const app = express();
//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/todos", todos);
app.use(notFound);
app.listen(port, () => console.log(`Server listening at port ${port}`));
