require("dotenv").config();
require("./database");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/Schema");
const Todos = require("./models/Todos");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from server side");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return res;
  } else {
    const newuser = new User({
      username: username,
      password: password,
    });
    await newuser.save();
    res.json({ username, password });
    console.log("New user created on mongodb");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: "invalid login" });
    return;
  }
  res.json({ message: "success" });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosList = req.body;
  console.log(todosList);
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: "invalid access" });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();

  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosList,
    });
  } else {
    todos.todos = todosList;
    await todos.save();
  }
  res.json(todosList);
});

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: "invalid access" });
    return;
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});

// Database connection process
const database = mongoose.connection;
database.on("error", console.error.bind(console, "connection error:"));
database.once("open", function () {
  app.listen(process.env.PORT || 2020, () => {
    console.log(`App listening on port: ${process.env.PORT}`);
  });
});
