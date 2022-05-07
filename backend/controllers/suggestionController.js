const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Suggestion = require("../models/suggestionModel");
// const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// for like
exports.like = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const suggestion = await Suggestion.findById(id);

  if (!suggestion) {
    return next(new ErrorHander("No suggestion found with this id", 404));
  }
  if (suggestion.likedBy.includes(req.user.email)) {
    res.send({ success: false, message: "You already liked this comment" });
    return;
  }
  if (suggestion.dislikedBy.includes(req.user.email)) {
    suggestion.totaldislike--;
    const arrayIndex = suggestion.dislikedBy.indexOf(req.user.email);
    suggestion.dislikedBy.splice(arrayIndex, 1);
    suggestion.totallike++;
    suggestion.likedBy.push(req.user.email);
    suggestion.save((err) => {
      if (err) {
        res.send({ success: false, message: "something went wrong" });
      } else {
        // console.log(suggestion);
        res.send({ success: true, message: "suggestion liked!" });
      }
    });
  } else {
    suggestion.totallike++;
    suggestion.likedBy.push(req.user.email);
    suggestion.save((err) => {
      if (err) {
        res.send({ success: false, message: "something went wrong" });
      } else {
        // console.log(suggestion);
        res.send({ success: true, message: "comment liked!" });
      }
    });
  }

  // suggestion.totallike++;
  // suggestion.save();

  // await Suggestion.updateOne(
  //     { _id:id },
  //     { $addToSet: { likedBy:req.user.email} }
  // );
  // // console.log("printing the size");
  // const suggestion1 = await Suggestion.findById(id);
  // console.log(suggestion1);

  // res.status(200).json({
  //     status: "success",
  //     data: {

  //     },
  // });
});

exports.dislike = catchAsyncErrors(async (req, res, next) => {
//   console.log("enter into the dislike pannel");
  const { id } = req.params;
  const suggestion = await Suggestion.findById(id);
  //  console.log(suggestion);
  // suggestion.totaldislike += 1;
  // await suggestion.save();
  if (!suggestion) {
    return next(new ErrorHander("No suggestion found with this id", 404));
  }
  if (suggestion.dislikedBy.includes(req.user.email)) {
    res.json({ success: false, message: "You already disliked this suggestion" });
  } else {
    if (suggestion.likedBy.includes(req.user.email)) {
      suggestion.totallike--;
      const arrayIndex = suggestion.likedBy.indexOf(req.user.email);
      suggestion.likedBy.splice(arrayIndex, 1);
      suggestion.totaldislike++;
      suggestion.dislikedBy.push(req.user.email);
      suggestion.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
            // console.log(suggestion);
          res.json({ success: true, message: "suggestion disliked!" });
        }
      });
    } else {
      suggestion.dislikes++;
      suggestion.dislikedBy.push(req.user.email);
      suggestion.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
            // console.log(suggestion);
          res.json({ success: true, message: "suggestion disliked!" });
        }
      });
    }
  }
  //     await Suggestion.updateOne(
  //         { _id: id },
  //         { $addToSet: { dislikedBy: req.user.email } }
  //     );
  //    const suggestion1 = await Suggestion.findById(id);
  //     // await suggestion.save();
  //     console.log(suggestion1);
  //     res.status(200).json({
  //         status: "success",
  //         data: {
  //             suggestion1,
  //         },
  //     });
});

exports.commentsDetails= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    // console.log("yeah inside the comment details");
    const suggestion = await Suggestion.findById(id);
    if (!suggestion) {
        return next(new ErrorHander("No suggestion found with this id", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
           like:suggestion.totallike,
          dislike:suggestion.totaldislike,

        },
    });
})

exports.addcomment = catchAsyncErrors(async (req, res, next) => {
  const { comment } = req.query;

  //    console.log(comment);
  req.body.comment = comment;
  req.body.user = req.user.id;

  const newComment = await Suggestion.create(req.body);

  res.status(200).json({
    status: "success",
    data: newComment,
  });
});

exports.allcomment = catchAsyncErrors(async (req, res, next) => {
  // console.log("inside the all comment section");
  const allcomment = await Suggestion.find();

//   console.log(allcomment);

  res.status(200).json({
    status: "success",
    data: allcomment,
  });
});
