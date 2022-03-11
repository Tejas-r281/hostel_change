// Create Token and saving in cookie

const sendToken = (user, statusCode, res,confirm) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (confirm === "confirmation") {
    res.redirect("http://localhost:3000/");
  } else {
    res.status(statusCode).cookie("hostel_student", token, options).json({
      success: true,
      user,
      token,
    });
  }

};

module.exports = sendToken;
