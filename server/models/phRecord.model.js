const mongoose = require("mongoose");
const router = require("../routes");

const schema = new mongoose.Schema({
    reading: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const record = new mongoose.model("phRecord", schema);
module.exports = record;