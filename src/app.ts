import routes from "./routes/router";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const { error } = dotenv.config();

if (error) console.log("Failed to load .env file");
else console.log("Successfully loaded .env file");

const { DATABASE_URL, PORT } = process.env;

const database = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database");
    console.log(error);
  }
};

database()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes)

module.exports = app;