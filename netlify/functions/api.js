import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/.netlify/functions/api/", router);

export const handler = serverless(api);

// const express = require("express");
// const serverless = require("serverless-http");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const noteRoutes = require("../../routes/note-routes");

// const app = express();
// const router = express.Router();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_DB_URI);

// app.use(cors()); // To globally tell server to use cors anytime a request is made to allow cross origin requests
// app.use(express.json()); // To parse incoming requests with JSON payloads. By default reads HTML

// // app.use("/notes", noteRoutes);

// app.get("/", (req, res) => {
//     res.json({ message: "API works" });
// });

// app.use("/.netlify/functions/api", router);

// module.exports.handler = serverless(app);
