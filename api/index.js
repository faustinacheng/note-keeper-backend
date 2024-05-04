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
    origin: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
    maxAge: 3600,
};
app.use(cors(corsOptions)); // To globally tell server to use cors anytime a request is made to allow cross origin requests
app.use(express.json()); // To parse incoming requests with JSON payloads. By default reads HTML
// app.use("/notes", noteRoutes);

// app.all("/", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//     );
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

// app.all("/notes/", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//     );
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // access-control-allow-origin,content-type

//     next();
// });

app.get("/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
    res.json({ message: "API works" });
});

app.options("/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
    res.json({ message: "API works" });
    // res.status(200).send();
});

app.get("/notes/:id", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
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

app.options("/notes/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
    res.status(200).send();
});

// POST
app.post("/notes/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
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
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
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
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );
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
