const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  if (req.body.change === false) {
    req.body.nexthostel = 0;
  }
  const { name, email, year, branch, password, change, hostel, nexthostel } =
    req.body;
  // console.log("inside the usercontroller");
  if (
    hostel <= 7 ||
    hostel >= 17 ||
    hostel === nexthostel ||
    (change === true && (nexthostel <= 7 || nexthostel >= 17))
  ) {
    return next(new ErrorHander("Please Enter valid hostel number", 400));
  }

  const user = await User.create({
    name,
    email,
    year,
    branch,
    password,
    change,
    hostel,
    nexthostel,
  });

  // 2) Generate ResetPassword Token
  const resetToken = user.getResetPasswordTokenemailconfirm();
  // 3) Save the resetToken in the user's document
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/confirm/${resetToken}`;
  // const resetPasswordUrl = `http://localhost:5000/api/v1/user/confirm/${resetToken}`;

  const message = `Please click this link to confirm your email address: ${resetPasswordUrl}.\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Please click to confirm the you email address`,
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    console.log(err);
    // agar saara galt ho jaata hai then humko dubaara user ka reset token bagerah ko undefined karna padega
    user.resetPasswordTokenemailconfirm = undefined;
    user.resetPasswordExpireemailconfirm = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorHander(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }

  //  sendToken(user, 201, res);
});

// confirm user
exports.confirmUser = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordTokenemailconfirm = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordTokenemailconfirm,
    resetPasswordExpireemailconfirm: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHander("Invalid Token", 400));
  }

  user.confirmed = true;
  user.resetPasswordTokenemailconfirm = undefined;
  user.resetPasswordExpireemailconfirm = undefined;
  // await user.save({ validateBeforeSave: false });

  await user.save();

  sendToken(user, req, 200, res, "confirmation");
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  if (user.confirmed == false) {
    return next(new ErrorHander("Please confirm your email", 401));
  }
  //pdf formation
  try {
    makePdf(user);
  } catch (err) {
    console.log(err);
  }
  const from1 = "<raushan.043.kumar@gmail>";
  const data = {
    from: from1,
    to: user.email,
    subject: "Thanks for visiting us ",
    html: `
        <div  style=" height:500px; width:500px;background:#E5E5E5;">
         <h2>Your details as follows</h2>
        <div style="height:300px; width:300px;display:flex; flex-direction:column; justify-content:center; text-align:center;">

<table>
  <tr>
    <th>Field</th>
    <th>Enter value </th>

  </tr>
  <tr>
    <td>Name</td>
    <td>${user.name}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${user.email}</td>
  </tr>
  <tr>
    <td>Year</td>
    <td>${user.year}</td>
  </tr>
  <tr>
    <td>Branch</td>
    <td>${user.branch}</td>
  </tr>
  <tr>
    <td>Alloted</td>
    <td>${user.hostel}</td>
  </tr>
  <tr>
    <td>Expected</td>
    <td>${user.nexthostel ? user.nexthostel : "not applicable"}</td>
  </tr>

</table>
        </div>
        </div>
        `,
    attachments: [
      {
        filename: "hostel.pdf",
        path: "../record/frontend/public/pdfs/hostel.pdf",
        cid: "hostel",
      },
    ],
  };

  try {
    await sendEmail(data);
  } catch (err) {
    console.log(err);
  }

  sendToken(user, req, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  const { hostel_student } = req.cookies;
  res.cookie(hostel_student, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // console.log("inside the forgot password");
  const user = await User.findOne({ email: req.body.email });

  // console.log(user);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: ` Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, req, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  // console.log(req);
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, req, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const curr = req.body.hostel;
  const nexth = req.body.nexthostel;
  if (
    curr <= 7 ||
    curr >= 17 ||
    curr === nexth ||
    (req.body.change === true && (nexth <= 7 || nexth >= 17))
  ) {
    return next(new ErrorHander("Please Enter valid hostel number", 400));
  }
  if (req.body.change == false) {
    req.body.nexthostel = 0;
  }

  const newUserData = {
    name: req.body.name,
    hostel: req.body.hostel,
    change: req.body.change,
    nexthostel: req.body.nexthostel,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   // const imageId = user.avatar.public_id;

  //   // await cloudinary.v2.uploader.destroy(imageId);

  //   // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   //   folder: "avatars",
  //   //   width: 150,
  //   //   crop: "scale",
  //   // });

  //   // newUserData.avatar = {
  //   //   public_id: myCloud.public_id,
  //   //   url: myCloud.secure_url,
  //   // };
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().sort({ change: -1, nexthostel: 1, name: 1 });

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("inside the delete section");
  const user = await User.findById(req.user.id);
  // console.log(user);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
