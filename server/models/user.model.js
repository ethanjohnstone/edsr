var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    dob: Date,
    phone: String,
    role: String
});

module.exports = new mongoose.model("User", schema);