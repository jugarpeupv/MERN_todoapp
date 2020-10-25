const mongoose = require("mongoose");
const express = require("express");
const app = express();

const database = process.env.DATABASE;

async function db() {
  await mongoose.connect("mongodb://localhost/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("MongoDB connected");
}

db();
