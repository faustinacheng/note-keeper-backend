const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const noteRoutes = require("./routes/note-routes");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI);

app.use(cors()); // To globally tell server to use cors anytime a request is made to allow cross origin requests
app.use(express.json()); // To parse incoming requests with JSON payloads. By default reads HTML
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API works" });
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
