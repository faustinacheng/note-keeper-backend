const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/note");

const router = express.Router(); // So we can directly manipulate data using controller functions

// GET
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Gets the notes for a user.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.patch("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router; // Exporting the router to be used in other files
