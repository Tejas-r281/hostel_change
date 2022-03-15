const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Suggestion = require("../models/suggestionModel");
// const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


exports.addcomment = catchAsyncErrors(async (req, res, next) => {
    const {comment} = req.query;

//    console.log(comment);
   req.body.comment=comment;
   req.body.user=req.user.id;

    const newComment= await Suggestion.create(req.body);

    res.status(200).json({
        status: "success",
        data:newComment
    });

});

exports.allcomment = catchAsyncErrors(async (req, res, next) => {
    // console.log("inside the all comment section");
    const allcomment= await Suggestion.find();


    // console.log(allcomment);

    res.status(200).json({
        status: "success",
        data:allcomment
    });

})

