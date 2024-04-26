const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Special mongoose data type that creates unique identifiers
    title: String,
    content: String,
    uid: String,
});

module.exports = mongoose.model("Note", noteSchema); // Exporting the model to be used in other files
