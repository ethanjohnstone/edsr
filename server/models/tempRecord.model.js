const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    reading: {
        type: Number,
        require: true
    }
}, { timestamps: true });

module.exports = new mongoose.model("tempRecord", schema);