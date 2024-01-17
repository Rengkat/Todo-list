const express = require("express");
const connectDB = require("./db/connect");
const todos = require("./router/todos");
const notFound = require("./middleware/not-found");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/todos", todos);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MANGO_URI);
    app.listen(port, () => console.log(`Server listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
