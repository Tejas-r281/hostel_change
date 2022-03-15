const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const userSchema = new mongoose.Schema({
    comment: {
        type: String,

        required: [true, "Please Enter Your Comment"],
        maxLength: [300, "Comment cannot exceed 300 characters"],
        minLength: [4, "Comment should have more than 4 characters"],
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            like: {
                type: Number,
                default: 0,
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            dislike: {
                type: Number,
                default: 0,
            }
        }
    ],
    
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
});

module.exports = mongoose.model("Suggestion", userSchema);