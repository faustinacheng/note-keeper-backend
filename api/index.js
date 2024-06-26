const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/note");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI);

const corsOptions = {
    origin: "https://keeper-fc.vercel.app",
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // To globally tell server to use cors anytime a request is made to allow cross origin requests
app.use(express.json()); // To parse incoming requests with JSON payloads. By default reads HTML

app.get("/", (req, res) => {
    res.json({ message: "API works" });
});

app.get("/notes/:id", (req, res) => {
    Note.find({ uid: req.params.id }) // Find all notes
        .exec()
        .then((notes) => {
            // console.log(notes);
            res.status(200).json(notes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// POST
app.post("/notes/", (req, res) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        uid: req.body.uid,
    });

    note.save() // Save note to database
        .then((result) => {
            console.log(result);
            res.status(201).json({
                // 201 status code means resource was successfully created
                message: "Note created",
                createdNote: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// PATCH
app.patch("/notes/:id", (req, res) => {
    const id = req.params.id;
    Note.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// DELETE
app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    Note.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;
