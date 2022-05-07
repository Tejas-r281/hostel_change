const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

dotenv.config({ path: "backend/config/config.env" });

const userSchema = new mongoose.Schema({
    comment: {
        type: String,

        required: [true, "Please Enter Your Comment"],
        maxLength: [300, "Comment cannot exceed 300 characters"],
        minLength: [4, "Comment should have more than 4 characters"],
    },
    // totallike: {
    //     type: Number,
    //     default: 0
    // },
    // totaldislike: {
    //     type: Number,
    //     default: 0
    // },
    // likedBy: {
    //     type:Array,
    // },
    // dislikedBy: {
    //     type:Array,
    // },
    likes:
    [
        
    ],
    users: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },



});

module.exports = mongoose.model("Suggestion", userSchema);