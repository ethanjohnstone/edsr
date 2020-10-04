const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    reading: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = new mongoose.model("phRecord", schema);